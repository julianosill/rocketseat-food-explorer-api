const AppError = require('../../utils/AppError')

class UpdateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ id, product }) {
    const { name, description, category, price } = product
    const productToUpdate = await this.productsRepository.findById(id)

    if (!productToUpdate) {
      throw new AppError('product/product-not-found')
    }

    if (name) {
      const nameExists = await this.productsRepository.findByName(name)
      if (nameExists && nameExists.id != id) {
        throw new AppError('product/name-already-exists')
      }
    }

    if (price && typeof price !== 'number') {
      throw new AppError('product/price-is-not-a-number')
    }

    product = {
      name: name ?? productToUpdate.name,
      description: description ?? productToUpdate.description,
      category: category ?? productToUpdate.category,
      price: price ?? productToUpdate.price,
    }

    return await this.productsRepository.update({ id, product })
  }
}

module.exports = UpdateProductService
