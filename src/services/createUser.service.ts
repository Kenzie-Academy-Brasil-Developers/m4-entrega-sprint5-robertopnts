import { hash } from "bcrypt"
import AppDataSource from "../data-source"
import { User } from "../entities/user.entity"
import { AppError } from "../errors/appError"
import { IUser, IUserRequest } from "../interfaces/users"

const createUserService = async ({name, email, isAdm, password}: IUserRequest): Promise<IUser>  => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const userExist = users.find(user => user.email === email)
    
    if(userExist) {
        throw new AppError('User already exists', 400)
    }

    const hashedPassword = await hash(password, 10)

    const user = userRepository.create({
        name,
        email,
        isAdm,
        isActive: true,
        password: hashedPassword
    })

    await userRepository.save(user)

    return user
}

export default createUserService