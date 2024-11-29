import { z } from "zod"

import { dBregistrationSchema, dBregistrationSchemaWithoutId, registrationSchema, registrationSchemaWithoutId, registrationStatus } from "../helpers/schema"

export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationWithoutId = z.infer<typeof registrationSchemaWithoutId>;
export type DbRegistration = z.infer<typeof dBregistrationSchema>;
export type DbRegistrationWithoutId = z.infer<typeof dBregistrationSchemaWithoutId>;
export type RegistrationStatus = z.infer<typeof registrationStatus>;

