import { Hono } from "hono";
import { cors } from "hono/cors";
import { endpointsV1 } from "./config/urls";
import prisma from "./client/db"
import { Lesson, LessonDb, lessonDbSchema } from "./features/lessons/lessons.schema";
import { z } from "zod";
import { courseDbSchema, courseSchema } from "./features/courses/types";
import { json } from "stream/consumers";

const app = new Hono();

app.use("/*", cors());

// ----- KURS -----
// GET - Hent liste over alle kurs
app.get(endpointsV1.courses, async (c) => {
  const data = await prisma?.course.findMany()
  return c.json(data)
})

// POST - Opprett et nytt kurs
app.post(endpointsV1.courses, async (c) => {
  try {
    const requestData = await c.req.json();
    const validatedCourse = courseSchema.parse(requestData);

    const existingCourse = await prisma.course.findUnique({
      where: { slug: validatedCourse.slug },
    });

    const existingLessons = await prisma.lesson.findMany({
      where: {
        slug: { in: validatedCourse.lessons.map((lesson: Lesson) => lesson.slug) }, 
      },
      select: { slug: true }, 
    });

    if(existingCourse || existingLessons.length > 0) {
      return c.json({ success: false, message: "NOT UNIQUE"}, 409);
    }
    
    const lessons = validatedCourse.lessons;

    const courseDbData = courseDbSchema.parse({
      id: crypto.randomUUID(),
      ...validatedCourse,
      lessons: undefined, 
    });

    const createdCourse = await prisma.course.create({
      data: courseDbData,
    });

    const createdLessons = await Promise.all(
      lessons.map((lesson:Lesson) => {
        const lessonDbData: LessonDb = lessonDbSchema.parse({
          ...lesson,
          courseId: createdCourse.id, 
          text: JSON.stringify(lesson.text), 
        });

          prisma.lesson.create({ data: lessonDbData });
      })
    );

    return c.json({ success: true, data: {createdCourse, createdLessons} }, 201);
  } catch (error) {
      return c.json({ success: false, message: "INERNAL SERVER ERROR" }, 500);
    }
});

// GET - Hent detaljene til et spesifikt kurs
app.get(endpointsV1.specificCourse, async (c) => {
  
})

// PATCH - Oppdater deler av kurset
app.patch(endpointsV1.specificCourse, async (c) => {

})

// DELETE - Slett et kurs
app.delete(endpointsV1.specificCourse, async (c) => {
  
})

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

// ----- LESSON -----
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
