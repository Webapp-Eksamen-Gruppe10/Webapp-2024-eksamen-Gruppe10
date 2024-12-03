import { Template } from "@/features/template/types";
import prisma from "../../../lib/client/db";
import {
  DbEventWithoutId,
  DbEventWithoutIdAndTemplateId,
  EventWithoutId,
} from "../types";

// Main validation orchestrator
export const validateEventWithTemplate = async (data: EventWithoutId) => {
  if (!data.template_id) {
    return null;
  }

  // Fetch the template
  const template = await prisma.template.findUnique({
    where: { id: data.template_id },
  });

  if (!template) {
    return "Template not found";
  }

  const validateNoSameDayConflict = async (
    template: Template,
    data: EventWithoutId | DbEventWithoutIdAndTemplateId
  ): Promise<string | null> => {
    if (!template.notSameDay) return null;

    const startOfDay = new Date(data.startsAt).setHours(0, 0, 0, 0);
    const endOfDay = new Date(data.startsAt).setHours(24, 0, 0, 0);

    const eventsOnSameDay = await prisma.event.findMany({
      where: {
        template_id: template.id,
        startsAt: {
          gte: new Date(startOfDay),
          lt: new Date(endOfDay),
        },
      },
    });

    if (eventsOnSameDay.length > 0) {
      const eventDate = new Date(data.startsAt).toISOString().split("T")[0];
      return `Another event with the same template is already scheduled on this day (${eventDate}).`;
    }

    return null;
  };
};

//   // Orchestrate all validation rules
//   const validations = [
//     validateNoSameDayConflict(template, data),
//     validateFixedPrice(template, data),
//     validateFreeEvent(template, data),
//     validateLimitedAttendance(template, data),
//   ];

//   // Run validations sequentially and return the first error
//   for (const validation of validations) {
//     const error = await validation;
//     if (error) return error;
//   }

//   // All validations passed
//   return null;
// };

// const validateNoSameDayConflict = async (
//   template: Template,
//   data: EventWithoutId | DbEventWithoutIdAndTemplateId
// ): Promise<string | null> => {
//   if (!template.notSameDay) return null;

//   const startOfDay = new Date(data.startsAt).setHours(0, 0, 0, 0);
//   const endOfDay = new Date(data.startsAt).setHours(24, 0, 0, 0);

//   const eventsOnSameDay = await prisma.event.findMany({
//     where: {
//       template_id: template.id,
//       startsAt: {
//         gte: new Date(startOfDay),
//         lt: new Date(endOfDay),
//       },
//     },
//   });

//   if (eventsOnSameDay.length > 0) {
//     const eventDate = new Date(data.startsAt).toISOString().split("T")[0];
//     return `Another event with the same template is already scheduled on this day (${eventDate}).`;
//   }

//   return null;
// };

// // Validation: Fixed price must have a valid price
// const validateFixedPrice = (
//   template: { fixed_price: boolean },
//   data: EventWithoutId | DbEventWithoutIdAndTemplateId
// ): Promise<string | null> => {
//   if (template.fixed_price && (!data.price || data.price <= 0)) {
//     return Promise.resolve("Fixed price events must have a valid price.");
//   }
//   return Promise.resolve(null);
// };

// // Validation: Free events should not have a price
// const validateFreeEvent = (
//   template: { free: boolean },
//   data: EventWithoutId | DbEventWithoutIdAndTemplateId
// ): Promise<string | null> => {
//   if (template.free && data.price > 0) {
//     return Promise.resolve("Free events should not have a price.");
//   }
//   return Promise.resolve(null);
// };

// // Validation: Limited attendance events must specify a valid capacity
// const validateLimitedAttendance = (
//   template: { lim_attend: boolean },
//   data: EventWithoutId | DbEventWithoutIdAndTemplateId
// ): Promise<string | null> => {
//   if (template.lim_attend && (!data.capacity || data.capacity <= 0)) {
//     return Promise.resolve(
//       "Limited attendance events must specify a valid capacity."
//     );
//   }
//   return Promise.resolve(null);
// };
