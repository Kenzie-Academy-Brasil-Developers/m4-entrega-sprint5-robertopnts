import { Router } from "express";
import { createScheduleController, listSchedulesController } from "../controllers/schedules.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureCommercialTimeMiddleware from "../middlewares/ensureCommercialTime.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const schedulesRoutes = Router()

schedulesRoutes.post("",ensureCommercialTimeMiddleware, ensureAuthMiddleware, createScheduleController)
schedulesRoutes.get("/properties/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, listSchedulesController)

export default schedulesRoutes