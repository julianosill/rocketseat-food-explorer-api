const AppError = require('../../utils/AppError')

class CreateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(product) {
    const { name, description, category, ingredients, price } = product

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

    if (ingredients.length <= 0) {
      throw new AppError('product/ingredients-are-missing')
    }

    const nameExists = await this.productsRepository.findByName(product.name)
    if (nameExists) {
      throw new AppError('product/name-already-exists')
    }

    if (typeof price !== 'number') {
      throw new AppError('product/price-is-not-a-number')
    }

    const [product_id] = await this.productsRepository.create({
      name,
      description,
      category,
      price,
    })

    const productCreated = {
      id: product_id,
      name,
      description,
      category,
      price,
    }

    return productCreated
  }
}

module.exports = CreateProductService
