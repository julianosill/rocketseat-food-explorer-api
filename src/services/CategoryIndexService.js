const AppError = require('../utils/AppError')

class CategoryIndexService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute() {
    const categories = await this.categoriesRepository.index()

    if (!categories) {
      throw new AppError('category/categories-is-empty')
    }

    return categories.map(category => category.name)
  }
}

module.exports = CategoryIndexService