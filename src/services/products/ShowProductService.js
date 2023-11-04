const AppError = require('../../utils/AppError')

class ShowProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ id, ingredients }) {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('product/product-not-found')
    }

    product.ingredients = ingredients.map(tag => tag.name)

    return product
  }
}

module.exports = ShowProductService
