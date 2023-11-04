const AppError = require('../../utils/AppError')

class ShowCategoryService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(id) {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new AppError('category/category-not-found')
    }

    return category
  }
}

module.exports = ShowCategoryService
