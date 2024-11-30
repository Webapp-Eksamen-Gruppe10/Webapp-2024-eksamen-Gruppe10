import { CreateRegistration, DbRegistration, Registration, RegistrationStatus, RegStatus } from "../types";
import { status } from "./schema";
import { z } from "zod"
  
    export const ToRegistrationObject = (dbRegistration: DbRegistration): Registration => {
        const registration: Registration = {
            ...dbRegistration,
            participants: JSON.parse(dbRegistration.participants),
            status: status.parse(dbRegistration.status)
        };
        return registration;
    };

    // Hentet logikk for dette fra chatGPT
    // src: https://chatgpt.com/share/674b2fe2-2f08-8013-8a5d-5c75e19939dd
    export const ToRegistrationArray = (dbRegistrations: DbRegistration[]): Registration[] => {
        return dbRegistrations.map((dBregistrations) => ({
            ...dBregistrations,
            participants: dBregistrations.participants
              ? JSON.parse(dBregistrations.participants)
              : [],
            status: (() => {
              try {
                return status.parse(dBregistrations.status);
              } catch {
                return "pending";
              }
            })(),
        }));
    };

  export const CreateRegistrationToDb = (registration: CreateRegistration, event_id: string, status: RegStatus): DbRegistration => {
    const registrationDb: DbRegistration = {
            ...registration,
            id: crypto.randomUUID(),
            participants: JSON.stringify(registration.participants),
            createdAt: new Date(),
            event_id: event_id,
            status: status
        }
        return registrationDb;
  };
  
    export const UpdateRegistrationStatusToDb = (registration: Registration): RegistrationStatus => {
        const registrationStatus: RegistrationStatus = {
            status: registration.status
        };
        return registrationStatus;
  };