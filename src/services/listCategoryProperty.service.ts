import AppDataSource from "../data-source"
import { Category } from "../entities/categories.entity"
import { Property } from "../entities/properties.entity"
import { AppError } from "../errors/appError"

const listCategoryPropertyService = async (idCategory: string): Promise<Category[]>  => {
    const categoryRepository = AppDataSource.getRepository(Category)
    
    const category = await categoryRepository.findOneBy({
        id: idCategory
    })
    if(!category){
        throw new AppError('Category not found', 404)
    }
    

    const categoryProperties = await categoryRepository.find({
        where: {
            property: {
                category: {
                    id: category.id
                }
            } 
        }, relations: {
            property: true
        }
    })

    return categoryProperties
    
}

export default listCategoryPropertyService