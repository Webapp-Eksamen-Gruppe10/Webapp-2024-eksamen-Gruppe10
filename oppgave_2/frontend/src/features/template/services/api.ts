import { ofetch } from 'ofetch';
import { endpoint } from "@/config/url";
import { Template, validateTemplate, validateTemplateList } from '../lib/schema';
import { Result } from '@/types';

const list = async () => {

    try {
        const templates = await ofetch(endpoint.templates.listByTemplates);
       
        return validateTemplateList(templates.data.map((template:Template) => ({
            ...template,
        })));
        
   
    } catch (error: unknown) {
        console.error('Error fetching templates:', error);

        throw {
            status: 500,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
};


const details = async (id: string) => {
    try {
        const template = await ofetch(endpoint.templates.details.replace('{id}', id));

        return validateTemplate(template);
        
       
    } catch (error: unknown) {
        console.error('Error fetching templates:', error);

        throw {
            status: 500,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
};


const create = async (data: Record<string, any>) => {
    try {
        
        const newTemplate = await ofetch(endpoint.templates.create, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 201,
            message: 'Template created successfully',
            data: newTemplate,
        };

    } catch (error: unknown) {
        console.error('Error fetching templates:', error);

        throw {
            status: 500,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
};


const update = async (id: string, data: Omit<Template, "id">): Promise<Result<Template>> => {
    try {
        const updatedTemplate = await ofetch(endpoint.templates.update.replace('{id}', id), {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return updatedTemplate
    } catch (error: any) {
       return error
    }
};


const remove = async (id: string) => {
    try {
        const deletedTemplate = await ofetch(endpoint.templates.delete.replace('{id}', id), {
            method: 'DELETE',
        });
        return deletedTemplate;
    } catch (error) {
        console.error(`Error deleting template with ID ${id}:`, error);
        throw error;
    }
};

export const templatesApi = {
    list,
    details,
    create,
    update,
    remove,
};
