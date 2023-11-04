const AppError = require('../../utils/AppError')

class IndexCategoryService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute() {
    const categories = await this.categoriesRepository.index()

    if (!categories) {
      throw new AppError('category/no-categories-registered')
    }

    return categories
  }
}

module.exports = IndexCategoryService
