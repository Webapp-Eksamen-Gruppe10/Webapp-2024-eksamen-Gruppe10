import { ResultHandler } from "@/lib/result"
import { templateRepository, type TemplateRepository } from "../repository"
import { Template, TemplateWithoutId } from "../types"
import { validateTemplate, validateTemplateWithoutId } from "../helpers/schema"

export const createTemplateService = (templateRepositoryDb: TemplateRepository) =>{
    
    const getAllTemplates = async() => {
        return templateRepositoryDb.list()
    }

    const getOneTemplate = async(id: string) => {
        const templateExist = await templateRepositoryDb.exist(id)
        if(!templateExist) return ResultHandler.failure("Template not found", "NOT_FOUND")
        
        return templateRepositoryDb.getById(id)
    }

    const createTemplate = async(data: TemplateWithoutId) => {
        if(!validateTemplateWithoutId(data).success)
            return ResultHandler.failure("Data does not match", "BAD_REQUEST")

        return templateRepositoryDb.create(data)
    }

    const updateTemplate = async(data: Template) => {
        const templateExist = await templateRepositoryDb.exist(data.id)
        if(!templateExist) return ResultHandler.failure("Template not found", "NOT_FOUND")

        const notAllowedUpdate = await templateRepositoryDb.eventsWithTemplate(data.id)
        if(notAllowedUpdate) return ResultHandler.failure("Event(s) are using this template", "FORBIDDEN")
            
        if(!validateTemplate(data).success)
            return ResultHandler.failure("Data does not match", "BAD_REQUEST")

        return templateRepositoryDb.updateById(data)
        
    }

    const deleteTemplate = async(id: string) => {
        const templateExist = await templateRepositoryDb.exist(id)
        if(!templateExist) return ResultHandler.failure("Template not found", "NOT_FOUND")

        const notAllowedDelete = await templateRepositoryDb.eventsWithTemplate(id)
        if(notAllowedDelete) return ResultHandler.failure("Event(s) are using this template", "FORBIDDEN")

        return templateRepositoryDb.deleteById(id)
    }

    return { getAllTemplates, getOneTemplate, createTemplate, updateTemplate, deleteTemplate };
}

export const templateService = createTemplateService(templateRepository)

export type TemplateService = ReturnType<typeof createTemplateService>;