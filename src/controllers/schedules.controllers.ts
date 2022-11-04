import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/createSchedule.service";
import listSchedulesService from "../services/listSchedules.service";

export const createScheduleController = async (req: Request, res: Response) => {
    const scheduleData: IScheduleRequest = req.body
    const id = req.user.id
    const scheduledVisit = await createScheduleService(scheduleData, id)
    return res.status(201).json({
        message: scheduledVisit
    })
}

export const listSchedulesController = async (req: Request, res: Response) => {
    const propertyId: string = req.params.id
    const schedules = await listSchedulesService(propertyId)
    return res.json({schedules})
}