import { Prisma } from "../../../lib/client/db";
import  prisma  from "../../../lib/client/db";

export const createRegistrationRepository = (prismaDb: Prisma) => {
    const exist = async(id: string) => {
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

    const event = async(eventId: string) => {
        try {
            const eventData = prismaDb.event.findUniqueOrThrow({
                where: {
                    id: eventId
                }
            })
        
        } catch (error) {
            
        }
    }
}

export const registrationRepository = createRegistrationRepository(prisma)

export type RegistrationRepository = ReturnType<typeof createRegistrationRepository>;