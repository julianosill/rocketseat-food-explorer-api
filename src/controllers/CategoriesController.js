const CategoriesRepository = require('../repositories/CategoriesRepository')
const CategoryIndexService = require('../services/CategoryIndexService')
const CategoryCreateService = require('../services/CategoryCreateService')
const CategoryDeleteService = require('../services/CategoryDeleteService')
const CategoryUpdateService = require('../services/CategoryUpdateService')

class CategoriesController {
  async index(request, response) {
    const categoriesRepository = new CategoriesRepository()
    const categoryIndexService = new CategoryIndexService(categoriesRepository)
    const categories = await categoryIndexService.execute()

    return response.status(200).json(categories)
  }

  async create(request, response) {
    const { name } = request.body
    const categoriesRepository = new CategoriesRepository()
    const categoryCreateService = new CategoryCreateService(
      categoriesRepository
    )
    await categoryCreateService.execute({ name })
    return response.status(201).json({ message: 'category-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body
    const categoriesRepository = new CategoriesRepository()
    const categoryUpdateService = new CategoryUpdateService(
      categoriesRepository
    )
    await categoryUpdateService.execute({ id, name })
    return response.status(201).json({ message: 'category-updated' })
  }

  async delete(request, response) {
    const { id } = request.params
    const categoriesRepository = new CategoriesRepository()
    const categoryDeleteService = new CategoryDeleteService(
      categoriesRepository
    )
    await categoryDeleteService.execute({ id })
    return response.status(201).json({ message: 'category-deleted' })
  }
}

module.exports = CategoriesController
