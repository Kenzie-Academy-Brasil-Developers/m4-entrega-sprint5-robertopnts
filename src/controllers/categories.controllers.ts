import { ICategoryRequest } from "../interfaces/categories"
import createCategoryService from "../services/createCategory.service"
import { Request, Response } from "express"
import listCategoryService from "../services/listCategory.service"
import listCategoryPropertyService from "../services/listCategoryProperty.service"

export const createCategoryController = async (req: Request, res: Response) => {
    const data: ICategoryRequest = req.body
    const categoryCreated = await createCategoryService(data)
    return res.status(201).json(categoryCreated)
}

export const listCategoryController = async (req: Request, res: Response) => {
    const categoriesList = await listCategoryService()
    return res.json(categoriesList)
}

export const listCategoryPropertyController = async (req: Request, res: Response) => {
    const id = req.params.id
    const categoryProperty = await listCategoryPropertyService(id)
    return res.json(categoryProperty)
}