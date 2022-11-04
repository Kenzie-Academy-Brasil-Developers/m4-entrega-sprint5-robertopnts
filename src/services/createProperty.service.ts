import AppDataSource from "../data-source"
import { Address } from "../entities/addresses.entity"
import { Category } from "../entities/categories.entity"
import { Property } from "../entities/properties.entity"
import { AppError } from "../errors/appError"
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties"

const createPropertyService = async ({value, size, address, categoryId}: IPropertyRequest): Promise<Property> => {
    const propertyRepository = AppDataSource.getRepository(Property)
    const categoryRepository = AppDataSource.getRepository(Category)
    const addressRepository = AppDataSource.getRepository(Address)

    const categoryExists = await categoryRepository.findOneBy({
        id: categoryId        
    })

    if(!categoryExists) {
        throw new AppError("Invalid category id", 404)
    }

    const addresses = await addressRepository.find()

    const addressAlreadyExists = addresses.find(addressArr => addressArr.zipCode === address.zipCode && addressArr.city === address.city)

    if(addressAlreadyExists) {
        throw new AppError("There is already a property with the same address", 400)
    }

    const addressCreated = addressRepository.create({
        city: address.city,
        district: address.district,
        number: address.number,
        state: address.state,
        zipCode: address.zipCode
    })

    await addressRepository.save(addressCreated)

    const property = propertyRepository.create({
        value,
        size,
        address: addressCreated,
        category: categoryExists
    })

    await propertyRepository.save(property)

    return property

}

export default createPropertyService