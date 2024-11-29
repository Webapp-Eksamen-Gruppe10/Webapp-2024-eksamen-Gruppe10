import { z } from "zod"

import { registrationSchema, registrationSchemaWithoutId, registrationStatus } from "../helpers/schema"

export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationWithoutId = z.infer<typeof registrationSchemaWithoutId>;
export type RegistrationStatus = z.infer<typeof registrationStatus>;

