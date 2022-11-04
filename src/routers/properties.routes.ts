import { Router } from "express";
import { createPropertyController, listPropertiesController } from "../controllers/properties.controllers";
import ensureAddressDataMiddleware from "../middlewares/ensureAddressData.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertiesRoutes = Router()

propertiesRoutes.post("", ensureAuthMiddleware, ensureIsAdmMiddleware, ensureAddressDataMiddleware, createPropertyController)
propertiesRoutes.get("", listPropertiesController)

export default propertiesRoutes