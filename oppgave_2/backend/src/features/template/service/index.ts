import { ResultHandler } from "@/lib/result"
import { templateRepository, type TemplateRepository } from "../repository"
import { TemplateWithoutId } from "../types"
import { validateTemplateWithoutId } from "../helpers/schema"

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
}