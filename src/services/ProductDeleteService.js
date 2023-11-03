const AppError = require('../utils/AppError')

class ProductDeleteService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ id }) {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('product/product-not-found')
    }

    return await this.productsRepository.delete({ id })
  }
}

module.exports = ProductDeleteService
