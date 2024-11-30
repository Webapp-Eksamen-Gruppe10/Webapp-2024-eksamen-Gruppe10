import { z } from "zod";

const registrationSchema = z.object({
  id: z.string(),
  event_id: z.string().max(45),
  name: z.string().max(45),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  participants: z.string().array(),
  phoneNumber: z.string().max(70),
  status: z.string().max(45)
});

const registrationSchemaToDb = registrationSchema.omit({
  id: true,
  createdAt: true,
  status: true,
  event_id: true
})



const registrationListSchema = z.array(registrationSchema);
const registrationListSchemaToDb = z.array(registrationSchemaToDb);

export function validateRegistration(data: unknown) {
  return registrationSchema.safeParse(data);
}

export function validateRegistrationList(data: unknown) {
  return registrationListSchema.safeParse(data);
}

export function validateRegistrationToDb(data: unknown) {
  return registrationSchemaToDb.safeParse(data);
}

export function validateRegistrationListToDb(data: unknown) {
  return registrationListSchemaToDb.safeParse(data);
}

export {
  registrationSchema,
  registrationSchemaToDb,
  registrationListSchema,
  registrationListSchemaToDb,
};

export type Registration = z.infer<typeof registrationSchema>;
export type CreateRegistration = z.infer<typeof registrationSchemaToDb>;