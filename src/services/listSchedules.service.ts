import AppDataSource from "../data-source";
import { Property } from "../entities/properties.entity";
import { Schedules } from "../entities/scheduleUserProperties.entity";
import { AppError } from "../errors/appError";

const listSchedulesService = async (propertyId: string): Promise<Schedules[]> => {
    const propertyRepository = AppDataSource.getRepository(Property)
    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const propertyExists = await propertyRepository.findOneBy({
        id: propertyId
    })

    if(!propertyExists) {
        throw new AppError("Property do not exist", 404)
    }

    const scheduledVisits = await scheduleRepository.find({
        where: {
            property: {
                id: propertyExists.id
            }
        }, 
        relations: {
            user: true
        }
    })

    return scheduledVisits
}

export default listSchedulesService