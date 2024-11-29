import { z } from "zod";

export {
  registrationSchema,
  registrationSchemaWithoutId
};

const registrationSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  name: z.string(),
  email: z.string().array(),
  createdAt: z.boolean(),
  phoneNumber: z.boolean(),
  status: z.boolean(),
});

const registrationsSchema = z.array(registrationSchema);

const registrationSchemaWithoutId = registrationSchema.omit({
  id: true,
});

export function validateRegistration(data: unknown) {
    return registrationSchema.safeParse(data);
}

export function validateRegistrationList(data: unknown) {
    return registrationsSchema.safeParse(data);
}

export function validateRegistrationWithoutId(data: unknown) {
    return registrationSchemaWithoutId.safeParse(data);
}
