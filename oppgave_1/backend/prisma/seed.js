import { PrismaClient } from "@prisma/client";
import {
  courses,
  comments,
} from "../src/data/data.js";

const prisma = new PrismaClient();

// Create Courses and Lessons
const createCourses = async () => {
  await Promise.all(
    courses.map(async (course) => {
      await prisma.course.create({
        data: {
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          category: course.category,
          lessons: {
            create: course.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              slug: lesson.slug,
              description: lesson.description,
              preAmble: lesson.preAmble,
              text: JSON.stringify(lesson.text.map((item) => item.text)), // Konverterer til en string når lagres til db så kan vi hente den ut og parse den tilbake til et objekt i frontend
            })),
          },
        },
      });
    })
  );
};

// Create Comments
const createComments = async () => {
  await Promise.all(
    comments.map(async (comment) => {
      await prisma.comment.create({
        data: {
          id: comment.id,
          createdBy: JSON.stringify(comment.createdBy), 
          comment: comment.comment,
          lesson: {
            connect: { slug: comment.lesson.slug },
          },
        },
      });
    })
  );
};

const main = async () => {
  try {
    // Clear existing data
    await prisma.comment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();

    // Seed data
    await createCourses();
    await createComments();

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
