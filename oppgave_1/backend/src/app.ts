import { Hono } from "hono";
import { cors } from "hono/cors";
import { endpointsV1 } from "./config/urls";
import prisma from "./client/db"
import { Lesson, LessonDb, lessonDbSchema } from "./features/lessons/lessons.schema";
import { z } from "zod";
import { courseDbSchema as courseSchemaDb, courseSchema } from "./features/courses/types";
import { json } from "stream/consumers";

const app = new Hono();

app.use("/*", cors());

// ----- KURS -----
// GET - Hent liste over alle kurs
app.get(endpointsV1.courses, async (c) => {
  const data = await prisma?.course.findMany()
  data.map { () 

  }

  return c.json(data)
})

// POST - Opprett et nytt kurs
app.post(endpointsV1.courses, async (c) => {
  try {
    const requestData = await c.req.json();
    const validatedCourse = courseSchema.parse(requestData);

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
        text: JSON.stringify(lesson.text),
      }))
    });

    return c.json({ success: true, data: createdCourse }, 201);
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
    
    /* Specific Course bør nå se slik ut:
      {
        "id": "1",
        "title": "JavaScript 101",
        "slug": "javascript-101",
        "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
        "category": "code"
      }
    */
    // Hent alle lessons knyttet til dette kurset
    const allLessonsForCourse = await prisma?.lesson.findMany({where: {'courseId': courseId}})
    if(!allLessonsForCourse){
      return c.json({ success: false, message: "NO CONTENT"}, 204);
    }
    /* allLessonsForCourse bør nå se slik ut:
      [
        {
          "id": "1",
          "courseId": "1",
          "title": "Variabler",
          "slug": "variabler",
          "preAmble": "Lorem ipsum dolor sit amet, conseteturusam et.",
          "text": "[\"Lat, sed diam volupt digren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\"]"
        },
        {
          "id": "2",
          "courseId": "1",
          "title": "Løkker",
          "slug": "lokker",
          "preAmble": "Lorem gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          "text": "[]"
        },
      ]
    */
    
    // Kombiner Kurs + Lessons
    /* Skal sendes tilbake ifølge features/courses/types.ts
      id: z.string().optional(),
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      lessons: z.array(lessonSchema),
      category: z.string()
    */
    var returnCourse = { ...specificCourse, lessons: allLessonsForCourse }
    const validatedCourse = courseSchema.parse(returnCourse)

    // Returner data
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
    
    return c.json(updateCourse);

  } catch (error) {
    return c.json({ success: false, message: "INERNAL SERVER ERROR" }, 500);
  }
})

// DELETE - Slett et kurs
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
app.get(endpointsV1.lessons, async (c) => {
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
});

// ----- LESSON -----
/*
// POST - Opprett en ny leksjon i et kurs.
app.post(endpointsV1.lessons, async (c) => {
  
})

// GET - Hent detaljer om en spesifikk leksjon.
app.get(endpointsV1.specificLesson, async (c) => {
  
})

// PATCH - Oppdater deler av leksjonen.
app.patch(endpointsV1.specificLesson, async (c) => {
  
})

// DELETE - Slett en leksjon.
app.delete(endpointsV1.specificLesson, async (c) => {
  
})
*/

// ----- COMMENTS -----

// GET - Hent alle kommentarer på en leksjon.
app.get(endpointsV1.comments, async (c) => {

})

// POST - Legg til en kommentar til en leksjon.
app.post(endpointsV1.comments, async (c) => {
  
})

// GET - Hent en spesifikk kommentar.
app.get(endpointsV1.specificComment, async (c) => {
  
})

// PATCH - Oppdater deler av kommentaren.
app.patch(endpointsV1.specificComment, async (c) => {
  
})

// DELETE - Slett en kommentar.
app.delete(endpointsV1.specificComment, async (c) => {
  
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
