const AppError = require('../utils/AppError')

class ProductCreateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(requestData) {
    const { name, description, category, ingredients, price, image } =
      requestData

    if (!name) {
      throw new AppError('product/name-is-missing')
    }

    if (!description) {
      throw new AppError('product/description-is-missing')
    }

    if (!category) {
      throw new AppError('product/category-is-missing')
    }

    if (!ingredients) {
      throw new AppError('product/ingredients-are-missing')
    }

    if (!price) {
      throw new AppError('product/price-is-missing')
    }

    const nameExists = await this.productsRepository.findByName(name)
    if (nameExists) {
      throw new AppError('product/name-already-exists')
    }

    const productData = {
      name,
      description,
      category,
      price,
    }

    await this.productsRepository.create(productData)

    return productData
  }
}

module.exports = ProductCreateService