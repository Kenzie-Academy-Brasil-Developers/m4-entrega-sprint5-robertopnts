import AppDataSource from "../data-source"
import { Category } from "../entities/categories.entity"
import { Property } from "../entities/properties.entity"
import { AppError } from "../errors/appError"

const listCategoryPropertyService = async (idCategory: string): Promise<Category> => {
    const categoryRepository = AppDataSource.getRepository(Category)
    
    const category = await categoryRepository.findOne({
        where: {
            id: idCategory
        }, relations: {
            properties: true
        }
    })
    if(!category){
        throw new AppError('Category not found', 404)
    }

    console.log(category)

    return category
    
}

export default listCategoryPropertyService