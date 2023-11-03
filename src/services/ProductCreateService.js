const AppError = require('../utils/AppError')

class ProductCreateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ product, imageFile }) {
    const { name, description, category, price } = product

    const requiredColumns = {
      name: 'product/name-is-missing',
      description: 'product/description-is-missing',
      category: 'product/category-is-missing',
      ingredients: 'product/ingredients-are-missing',
      price: 'product/price-is-missing',
    }

    for (const column of Object.keys(requiredColumns)) {
      if (!product[column]) {
        throw new AppError(requiredColumns[column])
      }
    }

    if (!imageFile) {
      throw new AppError('product/image-is-missing')
    }

    const nameExists = await this.productsRepository.findByName(product.name)
    if (nameExists) {
      throw new AppError('product/name-already-exists')
    }

    return await this.productsRepository.create({
      name,
      description,
      category,
      price,
    })
  }
}

module.exports = ProductCreateService
