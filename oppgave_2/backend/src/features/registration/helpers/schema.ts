import { z } from "zod";

export {
  registrationSchema,
  registrationsSchema,
  registrationSchemaWithoutId,
  registrationStatus,
  dBregistrationSchema,
  dBregistrationSchemaWithoutId,
  status
};

const status = z.enum(["confirmed", "pending", "waitinglist", "denied"])

const registrationSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  participants: z.string().array(),
  phoneNumber: z.string(),
  status: status,
});

const dBregistrationSchema = z.object({
    id: z.string(),
    event_id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.coerce.date(),
    participants: z.string(),
    phoneNumber: z.string(),
    status: z.string(),
  });

const registrationSchemaWithoutId = registrationSchema.omit({
  id: true,
});

const dBregistrationSchemaWithoutId = dBregistrationSchema.omit({
    id: true
})

const registrationStatus = registrationSchema.pick({
    status: true,
});

const registrationsSchema = z.array(registrationSchema);

export function validateRegistration(data: unknown) {
    return registrationSchema.safeParse(data);
}

export function validateRegistrationList(data: unknown) {
    return registrationsSchema.safeParse(data);
}

export function validateDbRegistration(data: unknown) {
    return dBregistrationSchema.safeParse(data);
}

export function validateRegistrationWithoutId(data: unknown) {
    return registrationSchemaWithoutId.safeParse(data);
}

export function validateDbRegistrationWithoutId(data: unknown) {
    return dBregistrationSchemaWithoutId.safeParse(data);
}
