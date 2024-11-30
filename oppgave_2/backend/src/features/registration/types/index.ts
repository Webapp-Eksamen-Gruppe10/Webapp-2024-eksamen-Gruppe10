import { z } from "zod"

import { dBregistrationSchema, dBregistrationSchemaWithoutId, registrationSchema, createRegistrationSchema, registrationStatus, status } from "../helpers/schema"

export type Registration = z.infer<typeof registrationSchema>;
export type CreateRegistration = z.infer<typeof createRegistrationSchema>;
export type DbRegistration = z.infer<typeof dBregistrationSchema>;
export type DbRegistrationWithoutId = z.infer<typeof dBregistrationSchemaWithoutId>;
export type RegistrationStatus = z.infer<typeof registrationStatus>;
export type RegStatus = z.infer<typeof status>

