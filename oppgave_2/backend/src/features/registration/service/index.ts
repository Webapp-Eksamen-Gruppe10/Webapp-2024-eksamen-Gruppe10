import { ResultHandler } from "../../../lib/result";
import { Result } from "../../../types";
import { registrationRepository, RegistrationRepository } from "../repository";
import { Registration } from "../types";


export const createRegistrationService = (registrationRepositoryDb: RegistrationRepository) => {

    const getAllRegistrations = async (): Promise<Result<Registration[]>> => {
        return registrationRepositoryDb.list();
      };
    
    const getOneTemplate = async (id: string): Promise<Result<Registration>> => {
        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");
    
        return registrationRepositoryDb.getById(id);
      };


  };

  export const templateService = createRegistrationService(registrationRepository);
  
  export type RegistrationService = ReturnType<typeof createRegistrationService>;