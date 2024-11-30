import { ResultHandler } from "../../../lib/result";
import { Result } from "../../../types";
import { ToRegistrationObject } from "../helpers/mapper";
import { status, validateRegistration, validateCreateRegistration } from "../helpers/schema";
import { registrationRepository, RegistrationRepository } from "../repository";
import { Registration, CreateRegistration } from "../types";


export const createRegistrationService = (registrationRepositoryDb: RegistrationRepository) => {

  const getAllRegistrationsAllEvents = async (): Promise<Result<Registration[]>> => {
    const allRegistrations = await registrationRepositoryDb.getAllRegistrationsAllEvents()
    if (!allRegistrations) return ResultHandler.failure("Could not find any registrations", "NOT_FOUND")

    return allRegistrations;
  };

    const getAllRegistrations = async (eventId: string): Promise<Result<Registration[]>> => {
        const eventExist = await registrationRepositoryDb.eventExist(eventId)
        if (!eventExist) return ResultHandler.failure("No event with this event_id", "NOT_FOUND")
    
        return registrationRepositoryDb.list(eventId);
      };
    
    const getOneRegistration = async (id: string, eventId: string): Promise<Result<Registration>> => {

        const eventExist = await registrationRepositoryDb.eventExist(eventId)
        if (!eventExist) return ResultHandler.failure("No event with this event_id", "NOT_FOUND")

        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");
    
        return registrationRepositoryDb.getById(id, eventId);
      };

    const createRegistration = async (
        data: CreateRegistration, eventId: string
        ): Promise<Result<Registration>> => {
        const eventExist = await registrationRepositoryDb.eventExist(eventId)
        if (!eventExist) return ResultHandler.failure("No event with this event_id", "NOT_FOUND")

        if (!validateCreateRegistration(data).success) return ResultHandler.failure("Data does not match", "BAD_REQUEST");

        const event = await registrationRepositoryDb.event(eventId)
        if(!event?.waitinglist && ((event?.capacity?? 0) - (event?.currentCapacity?? 0)) < data.participants.length+1)
            return ResultHandler.failure("The event is full, and waiting list is not allowed", "FORBIDDEN")

        if (event?.waitinglist && ((event?.capacity?? 0) - (event?.currentCapacity?? 0)) < data.participants.length+1) {
            registrationRepositoryDb.eventCurrentCap(eventId, (event?.currentCapacity ?? 0)+(data.participants.length+1))
            return registrationRepositoryDb.create(
                data,
                eventId,
                status.Enum.venteliste
            )
        } else {
            registrationRepositoryDb.eventCurrentCap(eventId, (event?.currentCapacity ?? 0)+(data.participants.length+1))
            return registrationRepositoryDb.create(
                data,
                eventId,
                status.Enum.ventende
            );
        }
      };
    
    const updateRegistration = async (
        data: Registration,
        id: string,
        eventId: string
      ): Promise<Result<Registration>> => {

        const eventExist = await registrationRepositoryDb.eventExist(eventId)
        if (!eventExist) return ResultHandler.failure("No event with this event_id", "NOT_FOUND")

        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");
    
        if (!validateRegistration(data).success)
          return ResultHandler.failure("Data does not match", "BAD_REQUEST");
    
        return registrationRepositoryDb.updateById(data, id, eventId);
      };
    
    const deleteRegistration = async (id: string, eventId: string): Promise<Result<string>> => {
        const eventExist = await registrationRepositoryDb.eventExist(eventId)
        if (!eventExist) return ResultHandler.failure("No event with this event_id", "NOT_FOUND")

        const registrationExist = await registrationRepositoryDb.registrationExist(id);
        if (!registrationExist)
          return ResultHandler.failure("Registration not found", "NOT_FOUND");
        
        const registration = await registrationRepositoryDb.regData(id)
        const event = await registrationRepositoryDb.event(registration?.event_id??"")
        registrationRepositoryDb.eventCurrentCap(registration?.event_id??"", (event?.currentCapacity?? 0) - ((JSON.parse(registration?.participants?? "").length)+1))

        return registrationRepositoryDb.deleteById(id, eventId);
      };
    
      return {
        getAllRegistrationsAllEvents,
        getAllRegistrations,
        getOneRegistration,
        createRegistration,
        updateRegistration,
        deleteRegistration,
      };
  };

  export const registrationService = createRegistrationService(registrationRepository);
  
  export type RegistrationService = ReturnType<typeof createRegistrationService>;