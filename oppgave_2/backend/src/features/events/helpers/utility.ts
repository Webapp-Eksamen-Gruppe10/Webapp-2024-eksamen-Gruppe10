import prisma from "../../../lib/client/db";
import { DbEventWithoutIdAndTemplateId, EventWithoutId } from "../types";
export const validateEventWithTemplate = async (
  data: EventWithoutId | DbEventWithoutIdAndTemplateId,
  templateId: string | null
): Promise<string | null> => {
  if (!templateId) {
    return "Template ID is missing for the event";
  }

  // Fetch the template
  const template = await prisma?.template.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    return "Template not found";
  }

  // Validation rules
  switch (true) {
    case template.fixed_price && (!data.price || data.price <= 0):
      return "Fixed price events must have a valid price";

    case template.free && data.price > 0:
      return "Free events should not have a price";

    case template.lim_attend && (!data.capacity || data.capacity <= 0):
      return "Limited attendance events must specify a valid capacity";

    case template.waitinglist && (!data.capacity || data.capacity <= 0):
      return "Waiting list events must specify a valid capacity";

    default:
      return null; // No validation errors
  }
};
