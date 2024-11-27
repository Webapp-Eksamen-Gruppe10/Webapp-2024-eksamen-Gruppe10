import { Prisma } from "@/lib/client/db";
import  prisma  from "@/lib/client/db";
import { Template, TemplateWithoutId } from "../types";
import { CreateTemplateToDb, ToTemplateArray, ToTemplateObject, UpdateTemplateToDb } from "../helpers/mappers";
import { ResultHandler } from "@/lib/result";

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

}

export const templateRepositoy = createTemplateRepository(prisma)