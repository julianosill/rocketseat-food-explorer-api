const AppError = require('../../utils/AppError')

class IndexProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ requestQuery, ingredientsDatabase }) {
    const { search, name, category, ingredients, id } = requestQuery

    let ingredientsTags
    if (ingredients) {
      ingredientsTags = ingredients.split(',').map(tag => tag.trim())
    }

    let productId
    if (id) {
      productId = id.split(',').map(item => item.trim())
    }

    const products = await this.productsRepository.index({
      search,
      name,
      category,
      ingredients: ingredientsTags,
      id: productId,
    })

    if (!products.length) {
      throw new AppError('product/products-not-found')
    }

    const productsWithIngredients = products.map(product => {
      const tags = ingredientsDatabase
        .filter(tag => tag.product_id === product.id)
        .map(tag => tag.name)
      return { ...product, ingredients: tags }
    })

    return productsWithIngredients
  }
}

module.exports = IndexProductService
