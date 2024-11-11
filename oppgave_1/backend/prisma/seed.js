import { PrismaClient } from "@prisma/client";
import {
  courses,
  users,
  comments,
  courseCreateSteps,
  categories,
} from "../../frontend/src/data/data.js";

const prisma = new PrismaClient();

// Create Users
const createUsers = async () => {
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    })
  );
};

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
          createdBy: comment.createdBy.id,
          comment: comment.comment,
          lesson: {
            connect: { slug: comment.lesson.slug },
          },
        },
      });
    })
  );
};

// Create CourseCreateSteps
const createCourseCreateSteps = async () => {
  await Promise.all(
    courseCreateSteps.map(async (step) => {
      await prisma.courseCreateStep.create({
        data: {
          id: step.id,
          name: step.name,
        },
      });
    })
  );
};

// Create Categories
const createCategories = async () => {
  await Promise.all(
    categories.map(async (category) => {
      await prisma.category.create({
        data: {
          name: category,
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
    await prisma.user.deleteMany();
    await prisma.courseCreateStep.deleteMany();
    await prisma.category.deleteMany();

    // Seed data
    await createUsers();
    await createCourses();
    await createComments();
    await createCourseCreateSteps();
    await createCategories();

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
