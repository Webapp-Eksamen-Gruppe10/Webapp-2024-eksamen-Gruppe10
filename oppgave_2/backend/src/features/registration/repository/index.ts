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
            prismaDb.registration.findUniqueOrThrow({
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
            prismaDb.event.findUniqueOrThrow({
                where: {
                    id: eventId
                }
            })
            return true
        } catch (error) {
            return false
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

    const list = async(): Promise<Result<Registration[]>> => {
        try {
            const registrations = await prismaDb.registration.findMany();

            return ResultHandler.success(ToRegistrationArray(registrations))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const getById = async(id: string): Promise<Result<Registration>> => {
        try {
            const registration = await prismaDb.registration.findUniqueOrThrow({
                where: {
                    id: id
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

    const updateById = async (data: Registration, id: string): Promise<Result<Registration>> => {
        try {
            const update = await prismaDb.registration.update({
                where: {
                    id: id
                },
                data: UpdateRegistrationStatusToDb(data)
            })
            return ResultHandler.success(ToRegistrationObject(update))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const deleteById = async (id: string): Promise<Result<string>> => {
        try {
            const deletedRegistration = await prismaDb.registration.delete({
                where: {
                    id: id
                }
            })
            return ResultHandler.success(id)
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    return { registrationExist, eventExist, event, create, list, getById, updateById, deleteById };
}

export const registrationRepository = createRegistrationRepository(prisma)

export type RegistrationRepository = ReturnType<typeof createRegistrationRepository>;