import { Prisma } from "@/lib/client/db";
import  prisma  from "@/lib/client/db";
import { Template, TemplateWithoutId } from "../types";
import { CreateTemplateToDb, ToTemplateArray, ToTemplateObject, UpdateTemplateToDb } from "../helpers/mappers";
import { ResultHandler } from "@/lib/result";
import { validateTemplate, validateTemplateWithoutId } from "../helpers/schema";

export const createTemplateRepository = (prismaDb: Prisma) => {

    const exist = async(id: string) => {
        try {
            prismaDb.template.findUniqueOrThrow({
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

    const list = async() => {
        try {
            const templates = await prismaDb.template.findMany();

            return ResultHandler.success(ToTemplateArray(templates))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const getById = async(id: string) => {
        try {
            const template = await prismaDb.template.findUnique({
                where: {
                    id: id
                }
            })

            return ResultHandler.success(template? ToTemplateObject(template): "")
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const create = async (data: TemplateWithoutId) => {
        try {
            const template = CreateTemplateToDb(data)

            const create = await prismaDb.template.create({data: template})

            return ResultHandler.success(create)
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const updateById = async (data: Template) => {
        try {
            const templateExist = await exist(data.id)
            if(!templateExist) return ResultHandler.failure("Template not found", "NOT_FOUND")

            const notAllowedUpdate = await eventsWithTemplate(data.id)
            if(notAllowedUpdate) return ResultHandler.failure("Event(s) are using this template", "FORBIDDEN")
            
            if(!validateTemplate(data).success)
                return ResultHandler.failure("Data does not match", "BAD_REQUEST")
        
            const update = await prismaDb.template.update({
                where: {
                    id: data.id
                },
                data: UpdateTemplateToDb(data)
            })

            return ResultHandler.success(update)
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    const deleteById = async (id: string) => {
        try {
            const templateExist = await exist(id)
            if(!templateExist) return ResultHandler.failure("Template not found", "NOT_FOUND")

            const notAllowedDelete = await eventsWithTemplate(id)
            if(notAllowedDelete) return ResultHandler.failure("Event(s) are using this template", "FORBIDDEN")
            
            const deletedTemplate = await prismaDb.template.delete({
                where: {
                    id: id
                }
            })

            return ResultHandler.success(ToTemplateObject(deletedTemplate))
        } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR")
        }
    }

    return { exist, eventsWithTemplate, create, list, getById, updateById, deleteById };
}

export const templateRepository = createTemplateRepository(prisma)

export type TemplateRepository = ReturnType<typeof createTemplateRepository>;