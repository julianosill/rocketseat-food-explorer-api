const AppError = require('../utils/AppError')

class CategoryUpdateService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ id, name }) {
    const category = await this.categoriesRepository.findById(id)

    if (!name) {
      throw new AppError('category/name-is-missing')
    }

    if (!category) {
      throw new AppError('category/category-not-found')
    }

    const categoryExists = await this.categoriesRepository.findByName(name)
    if (categoryExists && categoryExists.id != id) {
      throw new AppError('category/name-already-exists')
    }

    return await this.categoriesRepository.update({ id, name })
  }
}

module.exports = CategoryUpdateService
