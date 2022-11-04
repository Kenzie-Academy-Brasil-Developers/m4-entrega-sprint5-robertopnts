import { Router } from "express";
import { userLoginController } from "../controllers/session.controllers";
import userLoginService from "../services/userLogin.service";

const sessionRoutes = Router()

sessionRoutes.post('', userLoginController)

export default sessionRoutes