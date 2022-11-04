import { Router } from "express";
import { createUserController, deleteUserController, listUserController, updateUserController } from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureUpdateDataMiddleware from "../middlewares/ensureUpdateData.middleware";

const usersRoutes = Router()

usersRoutes.post('', createUserController)
usersRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUserController)
usersRoutes.patch('/:id', ensureAuthMiddleware, ensureUpdateDataMiddleware, ensureIsAdmMiddleware, updateUserController)
usersRoutes.delete('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController)

export default usersRoutes