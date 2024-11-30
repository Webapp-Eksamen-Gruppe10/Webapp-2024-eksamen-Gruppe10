import { DbRegistration, Registration, RegistrationStatus, RegistrationWithoutId } from "../types";
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
  
    export const ToRegistrationArray = (dbRegistrations: DbRegistration[]): Registration[] => {
        const registrations: Registration[] = [];
  
        dbRegistrations.map((dBregistrations) => {
        registrations.push({
            ...dBregistrations,
            participants: JSON.parse(dBregistrations.participants),
            status: status.parse(dBregistrations.status)
        });
        });
  
        return registrations;
    };

  export const CreateRegistrationToDb = (registration: RegistrationWithoutId): DbRegistration => {
    const registrationDb: DbRegistration = {
            ...registration,
            id: crypto.randomUUID(),
            participants: JSON.stringify(registration.participants),
            createdAt: new Date()
        }
        return registrationDb;
  };
  
    export const UpdateRegistrationStatusToDb = (registration: Registration): RegistrationStatus => {
        const registrationStatus: RegistrationStatus = {
            status: registration.status
        };
        return registrationStatus;
  };