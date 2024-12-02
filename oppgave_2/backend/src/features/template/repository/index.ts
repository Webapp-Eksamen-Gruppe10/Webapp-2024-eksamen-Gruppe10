import { Prisma } from "../../../lib/client/db";
import  prisma  from "../../../lib/client/db";
import { Template, TemplateWithoutId } from "../types";
import { CreateTemplateToDb, ToTemplateArray, ToTemplateObject, UpdateTemplateToDb } from "../helpers/mappers";
import { ResultHandler } from "../../../lib/result";
import { validateTemplate, validateTemplateWithoutId } from "../helpers/schema";
import { Result } from "../../../types";

export const createTemplateRepository = (prismaDb: Prisma) => {

    const exist = async(id: string) => {
        try {
            await prismaDb.template.findUniqueOrThrow({
                where: {
                    id: id
                }
            })
            return true
        } catch (error) {
            return false
        }
    }

    const eventsWithTemplate = async(templateId: string): Promise<boolean> => {
        const eventsWithTemplates = await prismaDb.event.findMany({
            where: {
                template_id: templateId
            }
        })

        return eventsWithTemplates.length > 0
    }

    const list = async(): Promise<Result<Template[]>> => {
        try {
            const templates = await prismaDb.template.findMany();

            return ResultHandler.success(ToTemplateArray(templates))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const getById = async(id: string): Promise<Result<Template>> => {
        try {
            const template = await prismaDb.template.findUniqueOrThrow({
                where: {
                    id: id
                }
            })

            return ResultHandler.success(ToTemplateObject(template))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const create = async (data: TemplateWithoutId): Promise<Result<Template>> => {
        try {
            const template = CreateTemplateToDb(data)

            const create = await prismaDb.template.create({data: template})

            return ResultHandler.success(ToTemplateObject(create))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const updateById = async (data: Template, id: string): Promise<Result<Template>> => {
        try {
            const update = await prismaDb.template.update({
                where: {
                    id: id
                },
                data: UpdateTemplateToDb(data)
            })
            console.log(UpdateTemplateToDb(data))
            return ResultHandler.success(ToTemplateObject(update))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const deleteById = async (id: string): Promise<Result<string>> => {
        try {
            const deletedTemplate = await prismaDb.template.delete({
                where: {
                    id: id
                }
            })

            return ResultHandler.success(id)
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    return { exist, eventsWithTemplate, create, list, getById, updateById, deleteById };
}

export const templateRepository = createTemplateRepository(prisma)

export type TemplateRepository = ReturnType<typeof createTemplateRepository>;