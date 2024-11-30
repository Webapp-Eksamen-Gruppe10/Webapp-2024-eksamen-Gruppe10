import { z } from "zod";

const registrationSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email(),
  phoneNumber: z.string().max(70),
  status: z.string().max(45),
  event_id: z.string().max(45),
  createAt: z.coerce.date(),
  participants: z.string().array()
});

const registrationSchemaToDb = registrationSchema.omit({
  id: true,
  createAt: true,
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