import { ResultHandler } from "../../../lib/result";
import { Result } from "../../../types";
import { status, validateRegistration, validateRegistrationWithoutId } from "../helpers/schema";
import { registrationRepository, RegistrationRepository } from "../repository";
import { Registration, RegistrationWithoutId } from "../types";


export const createRegistrationService = (registrationRepositoryDb: RegistrationRepository) => {

    const getAllRegistrations = async (): Promise<Result<Registration[]>> => {
        return registrationRepositoryDb.list();
      };
    
    const getOneRegistration = async (id: string): Promise<Result<Registration>> => {
        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");
    
        return registrationRepositoryDb.getById(id);
      };

    const createRegistration = async (
        data: RegistrationWithoutId
        ): Promise<Result<Registration>> => {
        const eventExist = await registrationRepositoryDb.eventExist(data.event_id)
        if (!eventExist) return ResultHandler.failure("No event with this event_id", "NOT_FOUND")

        if (!validateRegistrationWithoutId(data).success) return ResultHandler.failure("Data does not match", "BAD_REQUEST");

        const event = await registrationRepositoryDb.event(data.event_id)
        if(!event?.waitinglist && ((event?.capacity?? 0) - (event?.currentCapacity?? 0)) < data.participants.length+1)
            return ResultHandler.failure("The event is full, and waiting list is not allowed", "FORBIDDEN")

        if (event?.waitinglist && ((event?.capacity?? 0) - (event?.currentCapacity?? 0)) < data.participants.length+1) {
            registrationRepositoryDb.eventCurrentCap(data.event_id, event.capacity)
            return registrationRepositoryDb.create({
                ...data,
                status: status.Enum.waitinglist
            })
        } else {
            registrationRepositoryDb.eventCurrentCap(data.event_id, (event?.currentCapacity ?? 0)+(data.participants.length+1))
            return registrationRepositoryDb.create({
                ...data,
                status: status.Enum.pending
            });
        }
      };
    
    const updateRegistration = async (
        data: Registration,
        id: string
      ): Promise<Result<Registration>> => {
        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");
    
        if (!validateRegistration(data).success)
          return ResultHandler.failure("Data does not match", "BAD_REQUEST");
    
        return registrationRepositoryDb.updateById(data, id);
      };
    
    const deleteRegistration = async (id: string): Promise<Result<string>> => {
        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");

        return registrationRepositoryDb.deleteById(id);
      };
    
      return {
        getAllRegistrations,
        getOneRegistration,
        createRegistration,
        updateRegistration,
        deleteRegistration,
      };
  };

  export const registrationService = createRegistrationService(registrationRepository);
  
  export type RegistrationService = ReturnType<typeof createRegistrationService>;