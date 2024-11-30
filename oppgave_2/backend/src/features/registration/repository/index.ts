import { nullable } from "zod";
import { Prisma } from "../../../lib/client/db";
import  prisma  from "../../../lib/client/db";
import { Registration, RegistrationWithoutId } from "../types";
import { Result } from "../../../types";
import { ResultHandler } from "../../../lib/result";
import { CreateRegistrationToDb, ToRegistrationArray, ToRegistrationObject, UpdateRegistrationStatusToDb } from "../helpers/mapper";

export const createRegistrationRepository = (prismaDb: Prisma) => {
    const registrationExist = async(id: string) => {
        try {
            await prismaDb.registration.findUniqueOrThrow({
                where: {
                    id: id
                }
            })
            return true
        } catch (error) {
            return false
        }
    }

    const eventExist = async(eventId: string) => {
        try {
            await prismaDb.event.findUniqueOrThrow({
                where: {
                    id: eventId
                }
            })
            return true
        } catch (error) {
            return false
        }
    }

    const eventCurrentCap = async(eventId: string, newCap: number) => {
        try {
            const registration = await prismaDb.event.update({
                where: {
                    id: eventId
                },
                data: {
                    currentCapacity: newCap
                }
            })
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const event = async(eventId: string) => {
        const eventData = prismaDb.event.findUnique({
            where: {
                id: eventId
            }
        })
        return eventData
    }

    const regData = async(id: string) => {
        const reg = prismaDb.registration.findUnique({
            where: {
                id: id
            }
        })
        return reg
    }

    const list = async(eventId: string): Promise<Result<Registration[]>> => {
        try {
            const registrations = await prismaDb.registration.findMany({
                where: {
                    event_id: eventId
                }
            });

            return ResultHandler.success(ToRegistrationArray(registrations))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const getById = async(id: string, eventId: string): Promise<Result<Registration>> => {
        try {
            const registration = await prismaDb.registration.findUniqueOrThrow({
                where: {
                    id: id,
                    event_id: eventId
                }
            })

            return ResultHandler.success(ToRegistrationObject(registration))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const create = async (data: RegistrationWithoutId): Promise<Result<Registration>> => {
        try {
            const registration = CreateRegistrationToDb(data)

            const create = await prismaDb.registration.create({data: registration})

            return ResultHandler.success(ToRegistrationObject(create))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const updateById = async (data: Registration, id: string, eventId: string): Promise<Result<Registration>> => {
        try {
            const update = await prismaDb.registration.update({
                where: {
                    id: id,
                    event_id: eventId
                },
                data: UpdateRegistrationStatusToDb(data)
            })
            return ResultHandler.success(ToRegistrationObject(update))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const deleteById = async (id: string, eventId: string): Promise<Result<string>> => {
        try {
            const deletedRegistration = await prismaDb.registration.delete({
                where: {
                    id: id,
                    event_id: eventId
                }
            })
            return ResultHandler.success(id)
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    return { registrationExist, eventExist, event, eventCurrentCap, regData, create, list, getById, updateById, deleteById };
}

export const registrationRepository = createRegistrationRepository(prisma)

export type RegistrationRepository = ReturnType<typeof createRegistrationRepository>;