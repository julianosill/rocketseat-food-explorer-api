const AppError = require('../utils/AppError')

class CategoryCreateService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ name }) {
    if (!name) {
      throw new AppError('category/name-is-missing')
    }

    const categoryExists = await this.categoriesRepository.findByName(name)
    if (categoryExists) {
      throw new AppError('category/name-already-exists')
    }

    return await this.categoriesRepository.create({ name })
  }
}

module.exports = CategoryCreateService
