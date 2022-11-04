import { Request, Response } from "express"
import { IPropertyRequest } from "../interfaces/properties"
import createPropertyService from "../services/createProperty.service"
import listPropertiesService from "../services/listProperties.service"

export const createPropertyController = async (req: Request, res: Response) => {
    const propertyData: IPropertyRequest = req.body
    const property = await createPropertyService(propertyData)
    return res.status(201).json(property)
}

export const listPropertiesController = async(req: Request, res: Response) => {
    const properties = await listPropertiesService()
    return res.status(200).json(properties)
}