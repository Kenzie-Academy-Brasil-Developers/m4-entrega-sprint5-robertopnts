import AppDataSource from "../data-source"
import { Property } from "../entities/properties.entity"
import { Schedules } from "../entities/scheduleUserProperties.entity"
import { User } from "../entities/user.entity"
import { AppError } from "../errors/appError"
import { IScheduleRequest } from "../interfaces/schedules"

const createScheduleService = async ({date, hour, propertyId}: IScheduleRequest, userId: string): Promise<Schedules> => {
    const schedulesRepository = AppDataSource.getRepository(Schedules)
    const usersRepository = AppDataSource.getRepository(User)
    const propertiesRepository = AppDataSource.getRepository(Property)
    
    const propertyExists = await propertiesRepository.findOneBy({
        id: propertyId
    })

    if(!propertyExists) {
        throw new AppError("Invalid property id", 404)
    }

    const userExists = await usersRepository.findOneBy({
        id: userId
    })

    if(!userExists){
        throw new AppError("You don't have authorization to schedule a visit", 401)
    }
    
    const scheduleExists = await schedulesRepository.findOneBy({
        hour: hour,
        date: date
    })

    if(scheduleExists) {
        throw new AppError("There's already a visit scheduled with the same date and hour", 400)
    }



    const scheduledVisit = schedulesRepository.create({
        date: date,
        hour: hour,
        property: propertyExists,
        user: userExists
    })

    await schedulesRepository.save(scheduledVisit)

    return scheduledVisit
}

export default createScheduleService