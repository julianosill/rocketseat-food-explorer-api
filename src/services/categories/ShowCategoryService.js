const AppError = require('../../utils/AppError')

class ShowCategoryService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ id, productsRepository }) {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new AppError('category/category-not-found')
    }

    const productsByCategory = await productsRepository.findByCategory(
      category.name
    )

    const categoryWithProducts = {
      ...category,
      total: productsByCategory.length,
      products: productsByCategory,
    }

    return categoryWithProducts
  }
}

module.exports = ShowCategoryService
