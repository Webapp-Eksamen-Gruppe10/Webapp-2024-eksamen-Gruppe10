import { ofetch } from 'ofetch';
import { endpoint } from "@/config/url";

const listByEvent = async (eventId: string) => {
    try {
        const registrations = await ofetch(endpoint.registrations.listByEvent.replace('{eventId}', eventId));
        
        if (!registrations || registrations.length === 0) {
            console.warn(`No registrations found for event ID ${eventId}.`);
            return {
                status: 204,
                message: 'No Content (ingen påmeldinger)',
                data: [],
            };
        }

        return {
            status: 200,
            message: 'OK',
            data: registrations,
        };
    } catch (error: unknown) {
        console.error(`Error fetching registrations for event ID ${eventId}:`, error);

        if (error instanceof Error) {
            throw {
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        }

        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


const details = async (eventId: string, id: string) => {
    try {
        const url = endpoint.registrations.details.replace('{eventId}', eventId).replace('{id}', id);

        const registration = await ofetch(url);

        return {
            status: 200,
            message: 'OK',
            data: registration,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching registration details for Event ID ${eventId} and ID ${id}:`, error.message);

            if (error.message.includes('404')) {
                throw {
                    status: 404,
                    message: `Registration with Event ID ${eventId} and ID ${id} not found`,
                };
            }

            throw {
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        }

        console.error(`Unknown error occurred while fetching details for Event ID ${eventId} and ID ${id}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};



const create = async (eventId: string, data: Record<string, any>) => {
    try {
        const newRegistration = await ofetch(endpoint.registrations.create.replace('{eventId}', eventId), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 200,
            message: 'Registration created successfully',
            data: newRegistration,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error creating registration for event ID ${eventId}:`, error.message);

            if (error.message.includes('404')) {
                throw {
                    status: 404,
                    message: `Event with ID ${eventId} not found`,
                };
            }

            throw {
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        }

        console.error(`Unknown error occurred while creating registration for event ID ${eventId}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


const update = async (id: string, data: Record<string, any>) => {
    try {
        const updatedRegistration = await ofetch(endpoint.registrations.update.replace('{id}', id), {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: 200,
            message: 'Registration updated successfully',
            data: updatedRegistration,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error updating registration with ID ${id}:`, error.message);

            if (error.message.includes('404')) {
                throw {
                    status: 404,
                    message: `Registration with ID ${id} not found`,
                };
            }

            throw {
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        }

        console.error(`Unknown error occurred while updating registration with ID ${id}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


const remove = async (id: string) => {
    try {
        const deletedRegistration = await ofetch(endpoint.registrations.delete.replace('{id}', id), {
            method: 'DELETE',
        });

        return {
            status: 200,
            message: 'Registration deleted successfully',
            data: deletedRegistration,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error deleting registration with ID ${id}:`, error.message);

            if (error.message.includes('404')) {
                throw {
                    status: 404,
                    message: `Registration with ID ${id} not found`,
                };
            }

            throw {
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        }

        console.error(`Unknown error occurred while deleting registration with ID ${id}:`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};

const listAll = async () => {
    try {
        const url = endpoint.registrations.listAll

        const registration = await ofetch(url);
        console.log("REGDATA ->" + JSON.stringify(registration))
        return {
            status: 200,
            message: 'OK',
            data: registration,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching registration details for all registrations`, error.message);

            if (error.message.includes('404')) {
                throw {
                    status: 404,
                    message: `Registrations not found`,
                };
            }

            throw {
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            };
        }

        console.error(`Unknown error occurred while fetching all registrations`, error);
        throw {
            status: 500,
            message: 'Internal Server Error',
            error: 'An unknown error occurred',
        };
    }
};


export const registrationsApi = {
    listByEvent,
    listAll,
    details,
    create,
    update,
    remove,
};
