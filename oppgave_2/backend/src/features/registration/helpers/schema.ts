import { z } from "zod";

export {
  registrationSchema,
  registrationsSchema,
  createRegistrationSchema,
  registrationStatus,
  dBregistrationSchema,
  dBregistrationSchemaWithoutId,
  status
};

const status = z.enum(["bekreftet", "ventende", "venteliste", "nektet"])

const registrationSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  name: z.string(),
  email: z.string(),
  startsAt: z.coerce.date(),
  participants: z.string().array(),
  phoneNumber: z.string(),
  status: status,
});

const dBregistrationSchema = z.object({
    id: z.string(),
    event_id: z.string(),
    name: z.string(),
    email: z.string(),
    startsAt: z.coerce.date(),
    participants: z.string(),
    phoneNumber: z.string(),
    status: z.string(),
  });

const createRegistrationSchema = registrationSchema.omit({
  id: true,
  event_id: true,
  startsAt: true,
  status: true
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

export function validateCreateRegistration(data: unknown) {
    return createRegistrationSchema.safeParse(data);
}

export function validateDbRegistrationWithoutId(data: unknown) {
    return dBregistrationSchemaWithoutId.safeParse(data);
}
