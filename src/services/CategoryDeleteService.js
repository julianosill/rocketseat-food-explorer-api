const AppError = require('../utils/AppError')

class CategoryDeleteService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ id }) {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new AppError('category/category-not-found')
    }

    return await this.categoriesRepository.delete({ id })
  }
}

module.exports = CategoryDeleteService
