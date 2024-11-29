import { z } from "zod"

import { registrationSchema, registrationSchemaWithoutId } from "../helpers/schema"

export type Registration = z.infer<typeof registrationSchema>;
export type RegistrationWithoutId = z.infer<typeof registrationSchemaWithoutId>;

