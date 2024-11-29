import { z } from "zod";

export {
  registrationSchema,
  registrationsSchema,
  registrationSchemaWithoutId,
  registrationsSchemaWithoutId,
  registrationStatus
};

const status = z.enum(["confirmed", "pending", "waitinglist", "denied"])

const registrationSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  phoneNumber: z.string(),
  status: status,
});

const registrationSchemaWithoutId = registrationSchema.omit({
  id: true,
});

const registrationStatus = registrationSchema.pick({
    status: true,
  });

const registrationsSchema = z.array(registrationSchema);
const registrationsSchemaWithoutId = z.array(registrationSchemaWithoutId);

export function validateRegistration(data: unknown) {
    return registrationSchema.safeParse(data);
}

export function validateRegistrationList(data: unknown) {
    return registrationsSchema.safeParse(data);
}

export function validateRegistrationWithoutId(data: unknown) {
    return registrationSchemaWithoutId.safeParse(data);
}

export function validateRegistrationWithoutIdList(data: unknown) {
    return registrationsSchemaWithoutId.safeParse(data);
}
