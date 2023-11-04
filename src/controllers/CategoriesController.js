const CategoriesRepository = require('../repositories/CategoriesRepository')
const IndexCategoryService = require('../services/categories/IndexCategoryService')
const ShowCategoryService = require('../services/categories/ShowCategoryService')
const CreateCategoryService = require('../services/categories/CreateCategoryService')
const DeleteCategoryService = require('../services/categories/DeleteCategoryService')
const UpdateCategoryService = require('../services/categories/UpdateCategoryService')

const ProductsRepository = require('../repositories/ProductsRepository')
const IndexProductService = require('../services/products/IndexProductService')

class CategoriesController {
  async index(request, response) {
    const categoriesRepository = new CategoriesRepository()
    const indexCategoryService = new IndexCategoryService(categoriesRepository)
    const categories = await indexCategoryService.execute()

    return response.status(200).json(categories)
  }

  async create(request, response) {
    const { name } = request.body

    const categoriesRepository = new CategoriesRepository()
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    )
    await createCategoryService.execute({ name })

    return response.status(201).json({ message: 'category-created' })
  }

  async show(request, response) {
    const { id } = request.params

    const categoriesRepository = new CategoriesRepository()
    const showCategoryService = new ShowCategoryService(categoriesRepository)

    const productsRepository = new ProductsRepository()

    const category = await showCategoryService.execute({
      id,
      productsRepository,
    })

    return response.status(201).json(category)
  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const categoriesRepository = new CategoriesRepository()
    const updateCategoryService = new UpdateCategoryService(
      categoriesRepository
    )
    await updateCategoryService.execute({ id, name })

    return response.status(201).json({ message: 'category-updated' })
  }

  async delete(request, response) {
    const { id } = request.params

    const categoriesRepository = new CategoriesRepository()
    const deleteCategoryService = new DeleteCategoryService(
      categoriesRepository
    )
    await deleteCategoryService.execute({ id })

    return response.status(201).json({ message: 'category-deleted' })
  }
}

module.exports = CategoriesController
