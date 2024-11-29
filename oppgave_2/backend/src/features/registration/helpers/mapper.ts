import { Registration, RegistrationStatus, RegistrationWithoutId } from "../types";
  
  export const CreateRegistrationToDb = (registration: RegistrationWithoutId[]): Registration[] => {
    const registrationDb: Registration[] = []
    registration.map((registration) => {
        registrationDb.push({
          ...registration,
          id: crypto.randomUUID(),
        });
      });
    
    return registrationDb;
  };
  
  export const UpdateRegistrationStatusToDb = (registration: Registration): RegistrationStatus => {
    const registrationStatus: RegistrationStatus = {
        status: registration.status
    };
    return registrationStatus;
  };