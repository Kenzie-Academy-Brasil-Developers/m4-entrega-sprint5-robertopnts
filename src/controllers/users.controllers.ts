import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import { IUserRequest, IUserUpdate } from "../interfaces/users"
import createUserService from "../services/createUser.service"
import listUsersService from "../services/listUsers.service"
import updateUserService from "../services/updateUser.service"
import deleteUserService from "../services/deleteUser.service"

export const createUserController = async (req:Request, res:Response) => {
        const user:IUserRequest = req.body
        const createdUser = await createUserService(user)
        return res.status(201).json(instanceToPlain(createdUser))
}


export const listUserController = async (req: Request, res: Response) => {
    const users = await listUsersService()
    return res.json(instanceToPlain(users))
}

export const updateUserController = async (req: Request, res: Response) => {
        const user: IUserUpdate = req.body
        const id: string = req.params.id
        const updatedUser = await updateUserService(user, id)
        return res.json(updatedUser)
}

export const deleteUserController = async (req: Request, res: Response) => {
        const id: string = req.params.id
        await deleteUserService(id)
        return res.status(204).send()
}

