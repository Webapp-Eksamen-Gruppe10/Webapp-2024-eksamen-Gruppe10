import { Hono } from "hono";
import { cors } from "hono/cors";
import { endpointsV1 } from "./config/urls";
import prisma from "./client/db"
import { Lesson, LessonDb, lessonDbSchema, lessonSchema } from "./features/lessons/lessons.schema";
import { map, z } from "zod";
import { courseDbSchema, courseSchema } from "./features/courses/types";
import { json } from "stream/consumers";
import { commentDbSchema, commentSchema, Comment, CommentDb } from "./features/comments/types";


const app = new Hono();

app.use("/*", cors());

// ----- KURS -----
// GET - Hent liste over alle kurs 
app.get(endpointsV1.courses, async (c) => { 
  try {
    // Hent alle kurs med tilknyttede leksjoner
    const data = await prisma.course.findMany({
      include: {
        lessons: true
        
      }
    });
    console.log(data);
    // validerer data fra databasen, deretter mapper til frontend-schema: 
    const parsedData = data.map((course) => {

      const dbCourse = courseDbSchema.parse(course); 
      console.log(dbCourse)
      const parsedLessons = course.lessons.map((lesson) => ({
        ...lesson, 
        text: JSON.parse(lesson.text).map((text: string) => ({
          id: crypto.randomUUID(), 
          text: text.toString(), 
        }))
      }));  

      // validerer course etter mapping: 
      return courseSchema.parse({
        ...dbCourse, 
        lessons: parsedLessons, 
      }); 

    }); 

    
    return c.json({ success: true, data: parsedData });

  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "INTERNAL SERVER ERROR" }, 500);
  }
});

// POST - Opprett et nytt kurs
app.post(endpointsV1.courses, async (c) => {
  try {
    const requestData = await c.req.json();
    const parsedCourse = requestData.lessons.map((lesson:Lesson) => {
      const updatedText = lesson.text.map((textItem) => ({
        ...textItem,
        id: crypto.randomUUID(),
      }));
    
      return {
        ...requestData,
        ...lesson,
        text: updatedText,
      };
    });
    const validatedCourse = courseSchema.parse(parsedCourse);

    // Her gjøres det en valideringssjekk for at både slugen/e til Course og Lessons er unike
    const existingCourse = await prisma.course.findUnique({
      where: { slug: validatedCourse.slug },
    });

    const existingLessons = await prisma.lesson.findMany({
      where: {
        slug: { in: validatedCourse.lessons.map((lesson: Lesson) => lesson.slug) },
      },
      select: { slug: true }, 
    });

    if(existingCourse) {
      return c.json({ success: false, message: "NOT UNIQUE" }, 409);
    }

    if (existingLessons.length > 0) {
      return c.json({ success: false, message: "NOT UNIQUE" }, 409);
    }

    const courseData = {
      id: crypto.randomUUID(),
      ...validatedCourse,
      lessons: undefined, 
    };

    const createdCourse = await prisma.course.create({
      data: courseData,
    });


    const createdLessons = await prisma.lesson.createMany({
      data: validatedCourse.lessons.map(lesson => ({
        ...lesson,
        courseId: createdCourse.id,
        text: JSON.stringify(lesson.text.map((item) => item.text))
      }))
    });
    console.log(createdLessons)
    return c.json({ success: true, data: createdCourse, createdLessons }, 201);
  } catch (error) {
    console.log('Error:', error); 
    return c.json({ success: false, message: "INTERNAL SERVER ERROR" }, 500);
  }
});

// GET - Hent detaljene til et spesifikt kurs
app.get(endpointsV1.specificCourse, async (c) => {
  // Hent et kurs
  try {
    const courseId = c.req.param("courseId");
    const specificCourse = await prisma?.course.findUnique({where: {id: courseId}})
  
    if(!specificCourse) {
      return c.json({ success: false, message: "NOT FOUND"}, 404);
    }
 
    // Hent alle lessons knyttet til dette kurset
    const allLessonsForCourse = await prisma?.lesson.findMany({where: {'courseId': courseId }})
     if(!allLessonsForCourse){
      return c.json({ success: false, message: "NO CONTENT"}, 204);
    }

    // mapper lessons til riktig format: 
    const parsedLessons = allLessonsForCourse?.map(lesson => ({
     ...lesson,
     text: JSON.parse(lesson.text).map((text:string) => ({
      id: crypto.randomUUID(),
      text: text.toString()
      }))
    }));
    
    // mapper course og validerer kurset: 
    var returnCourse = { ...specificCourse, lessons: parsedLessons }
    const validatedCourse = courseSchema.parse(returnCourse)
  
    return c.json({ success: true, data: validatedCourse })
  } catch (error) {
    return c.json({ success: false, message: "INERNAL SERVER ERROR" }, 500);
  }
})

// PATCH - Oppdater deler av kurset (kun category)
app.patch(endpointsV1.courses, async (c) => {
  try {
    const requestData = await c.req.json();
    if (!requestData) {
      return c.json({ success: false, message: "BAD REQUEST" }, 400);
    }
    
    const validatedCourse = courseSchema.parse(requestData);
    const courseId = validatedCourse.id;
    const updatedCategory = validatedCourse.category;
    
    const updateCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        category: updatedCategory,
      },
    })
    
    return c.json({success: true, data:updateCourse});

  } catch (error) {
    return c.json({ success: false, message: "INERNAL SERVER ERROR" }, 500);
  }
})

// DELETE - Slett et kurs
// husk å slette alle kommentarer for en lekson og 
app.delete(endpointsV1.specificCourse, async (c) => {
  try {
  const courseId = c.req.param("courseId");
  const specificCourse = await prisma?.course.findUnique({where: {id: courseId}})

  if(!specificCourse){
    return c.json({sucess: false, message: "NOT FOUND"}, 404)
  }

  const courseLessons = await prisma?.lesson.findMany({
    where: {courseId: courseId}
  })

  if(courseLessons.length > 0){

        const lessonIds = courseLessons.map(lesson => lesson.id);

        await prisma?.comment.deleteMany({
          where: { lessonId: { in: lessonIds } },
        });

    await prisma?.lesson.deleteMany({ where: {courseId: courseId}})
  } 

  await prisma?.course.delete({ where: {id: courseId} }); 
 
  return c.json({success: true, data: courseId}, 200)

  } catch(error){
    return c.json({success: false, message: "INTERNAL SERVER ERROR"}, 500)
  }
}); 

// ----- LESSON -----
// GET - Hent alle leksjoner i et bestemt kurs
/*app.get(endpointsV1.lessons, async (c) => {
  const courseId = c.req.param("courseId");  

  try {
    const lessons = await prisma?.lesson.findMany({
      where: {
        courseId: courseId,
      },
    });
    return c.json(lessons);

  } catch (error) {
    console.error(error);
    return c.json(undefined, 204);
  }
});*/

// ----- COMMENTS -----
// GET - Hent alle kommentarer på en leksjon.
app.get(endpointsV1.comments, async (c) => {
  try {
    const lessonId = c.req.param("lessonId");
    const allCommentsForLecture:CommentDb[] = await prisma?.comment.findMany({where: {lessonId: lessonId}})

    const parsedComments = await Promise.all(

      allCommentsForLecture.map(async (comment) => {
        const lesson = await prisma.lesson.findUnique({where: {id: lessonId}})

      if (!lesson){
        return c.json({success: false, message: "NOT FOUND"}, 404)
      }
        return commentSchema.parse({
          ...comment, 
          createdBy: JSON.parse(comment.createdBy),
          lesson: {
            slug: lesson.slug
          }
        }); 
    })
  ); 
 
    if (!allCommentsForLecture){
      return c.json({success: false, message: "NOT FOUND"}, 404)
    }

    return c.json({success: true, data: parsedComments})

  } catch (error) {
    return c.json({success: false, message: "INTERNAL SERVER ERROR"}, 500)
  }
})

// POST - Legg til en kommentar til en leksjon.
app.post(endpointsV1.comments, async (c) => {
  try {
    const lessonId = c.req.param("lessonId");
    const data = await c.req.json();
    console.log(data)
    const mappedData = {
      ...data,
      id: crypto.randomUUID(),
      createdBy: {
        ...data.createdBy,
        id: crypto.randomUUID(),
      },
    };
    
    console.log(mappedData)
    const validatedComment = commentSchema.parse(mappedData);

    const parsedComment = commentDbSchema.parse({
      ...validatedComment, 
      createdBy: JSON.stringify(validatedComment.createdBy), 
      lessonId: lessonId
    })

    const createdCourse = await prisma.comment.create({
     data: parsedComment
    });

    return c.json({success: true, data: createdCourse})


  } catch (error) {
    return c.json({success: false, message: "INTERNAL SERVER ERROR"}, 500)
  }
})


app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
