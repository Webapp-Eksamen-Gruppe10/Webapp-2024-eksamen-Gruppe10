import { PrismaClient } from "@prisma/client";
import { templates, registrations, events } from "../src/data/data.js";

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("Clearing database...");
  await prisma.registration.deleteMany(),
    await prisma.event.deleteMany(),
    await prisma.template.deleteMany(),
    console.log("Database cleared.");
}

async function seedTemplates() {
  console.log("Seeding templates...");
  await Promise.all(
    templates.map((template) =>
      prisma.template.create({
        data: {
          id: template.id,
          name: template.name,
          description: template.description,
          weekdays: template.weekdays,
          notSameDay: template.notSameDay,
          private: template.private,
          lim_attend: template.lim_attend,
          fixed_price: template.fixed_price,
          free: template.free,
          waitinglist: template.waitinglist,
        },
      })
    )
  );
  console.log("Templates seeded successfully.");
}

async function seedEvents() {
  console.log("Seeding events...");
  await Promise.all(
    events.map((event) =>
      prisma.event.create({
        data: {
          id: event.id,
          title: event.title,
          dateTime: new Date(event.dateTime),
          capacity: event.capacity,
          location: event.location,
          category: event.category,
          price: event.price,
          description: event.description,
          private: event.private,
          waitinglist: event.waitinglist,
          template: {
            connect: { id: event.template_id },
          },
        },
      })
    )
  );
  console.log("Events seeded successfully.");
}

async function seedRegistrations() {
  console.log("Seeding registrations...");
  await Promise.all(
    registrations.map((registration) =>
      prisma.registration.create({
        data: {
          event: {
            connect: { id: registration.event_id },
          },
          name: registration.name,
          email: registration.email,
          phoneNumber: registration.phoneNumber,
          status: registration.status,
        },
      })
    )
  );
  console.log("Registrations seeded successfully.");
}

async function main() {
  try {
    await clearDatabase();
    await seedTemplates();
    await seedEvents();
    await seedRegistrations();
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
