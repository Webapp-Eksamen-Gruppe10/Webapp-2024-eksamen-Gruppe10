import { ofetch } from 'ofetch';
import { endpoint } from "@/config/url";
import { Category, validateEventList, validateEventToDb } from '../lib/schema';
import {Event } from "@/features/event/lib/schema"
import { AddEventResult } from '@/types';

const list = async () => {
    try {

        const events = await ofetch(endpoint.events.list);
        
        return validateEventList(events.data.map((event:Event) => ({
            ...event,
            category: Category.parse(event.category)
        })));
        
    } catch (error) {
        console.error('Error fetching events:', error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};

const listFiltered = async (urlParams: URLSearchParams) => {
    try {

        const events = await ofetch(`${endpoint.events.list}?${urlParams}`);
        
        return validateEventList(events.data.map((event:Event) => ({
            ...event,
            category: Category.parse(event.category)
        })));
        
    } catch (error) {
        console.error('Error fetching events:', error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


const details = async (id: string) => {
    try {
        const event = await ofetch(endpoint.events.details.replace('{id}', id));
        
        return {
            status: 200,
            message: 'OK',
            data: event,
        };
    } catch (error) {
        console.error(`Unknown error occurred while fetching details for ID ${id}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};



const create = async (data: Record<string, any>): Promise<AddEventResult> =>  {
    try {
        console.log(JSON.stringify(data));
        const validatedData = validateEventToDb(data);
        console.log(JSON.stringify(validatedData));

        const newEvent = await ofetch(endpoint.events.create, {
            method: 'POST',
            body: JSON.stringify(validatedData.data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

       
        return {
            success: true,
            data: newEvent,
        };
    } catch (error) {
        console.error('Error fetching events:', error);

        return {
            success: false,
            error: {
                code: 500,
                message: 'Failed to create event',
            },
        };
    }
};




const update = async (id: string, data: Record<string, any>) => {
    try {
        const updatedEvent = await ofetch(endpoint.events.update.replace('{id}', id), {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 200,
            message: 'Event updated successfully',
            data: updatedEvent,
        };
    } catch (error){
        console.error(`Unknown error occurred while updating event with ID ${id}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


const remove = async (id: string) => {
    try {
        const deletedEvent = await ofetch(endpoint.events.delete.replace('{id}', id), {
            method: 'DELETE',
        });

        return {
            status: 200,
            message: 'Event deleted successfully',
            data: deletedEvent,
        };
    } catch (error){
        console.error(`Unknown error occurred while deleting event with ID ${id}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


export const eventsApi = {
    list,
    listFiltered, 
    details,
    create,
    update,
    remove,
};
