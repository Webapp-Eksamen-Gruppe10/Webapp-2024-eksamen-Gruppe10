import { DbRegistration, Registration, RegistrationStatus, RegistrationWithoutId } from "../types";
  
    export const ToRegistrationObject = (dbRegistration: DbRegistration): Registration => {
        const registration: Registration = {
            ...dbRegistration,
            participants: JSON.parse(dbRegistration.participants),
        };
        return registration;
    };
  
    export const ToRegistrationArray = (dbRegistrations: DbRegistration[]): Registration[] => {
        const registrations: Registration[] = [];
  
        dbRegistrations.map((dBregistrations) => {
        registrations.push({
            ...dBregistrations,
            participants: JSON.parse(dBregistrations.participants),
        });
        });
  
        return registrations;
    };

  export const CreateRegistrationToDb = (registration: RegistrationWithoutId): DbRegistration => {
    const registrationDb: DbRegistration = {
            ...registration,
            id: crypto.randomUUID(),
            participants: JSON.stringify(registration.participants),
        }
        return registrationDb;
  };
  
    export const UpdateRegistrationStatusToDb = (registration: Registration): RegistrationStatus => {
        const registrationStatus: RegistrationStatus = {
            status: registration.status
        };
        return registrationStatus;
  };