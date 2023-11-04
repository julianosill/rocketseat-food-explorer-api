const AppError = require('../utils/AppError')

class ProductIndexService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(requestQuery) {
    const { name, category, ingredients } = requestQuery

    let tags
    if (ingredients) {
      tags = ingredients.split(',').map(tag => tag.trim())
    }

    const products = await this.productsRepository.index({
      name,
      category,
      tags,
    })

    if (!products.length) {
      throw new AppError('product/products-not-found')
    }

    return products
  }
}

module.exports = ProductIndexService
