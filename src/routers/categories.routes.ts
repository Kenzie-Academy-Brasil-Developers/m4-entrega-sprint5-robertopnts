import { Router } from "express";
import { createCategoryController, listCategoryController, listCategoryPropertyController } from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoriesRoutes = Router()

categoriesRoutes.post("", ensureAuthMiddleware, ensureIsAdmMiddleware, createCategoryController)
categoriesRoutes.get("", listCategoryController)
categoriesRoutes.get("/:id/properties", listCategoryPropertyController)

export default categoriesRoutes