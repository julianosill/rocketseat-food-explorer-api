const ProductsRepository = require('../repositories/ProductsRepository')
const ProductCreateService = require('../services/ProductCreateService')
const ProductUpdateService = require('../services/ProductUpdateService')
const ProductDeleteService = require('../services/ProductDeleteService')

const IngredientsRepository = require('../repositories/IngredientsRepository')
const IngredientCreateService = require('../services/IngredientCreateService')

class ProductsController {
  async create(request, response) {
    const { name, description, category, price, ingredients } = request.body
    const productData = { name, description, category, price, ingredients }

    const productsRepository = new ProductsRepository()
    const productCreateService = new ProductCreateService(productsRepository)
    const [product_id] = await productCreateService.execute(productData)

    const ingredientsRepository = new IngredientsRepository()
    const ingredientCreateService = new IngredientCreateService(
      ingredientsRepository
    )
    await ingredientCreateService.execute({ ingredients, product_id })

    return response.status(201).json({ message: 'product-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const updateData = request.body
    const productsRepository = new ProductsRepository()
    const productUpdateService = new ProductUpdateService(productsRepository)
    await productUpdateService.execute({ id, updateData })
    return response.status(201).json({ message: 'product-updated' })
  }

  async delete(request, response) {
    const { id } = request.params
    const productsRepository = new ProductsRepository()
    const productDeleteService = new ProductDeleteService(productsRepository)
    await productDeleteService.execute({ id })
    return response.status(201).json({ message: 'product-deleted' })
  }
}

module.exports = ProductsController
