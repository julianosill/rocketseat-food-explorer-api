const ProductsRepository = require('../repositories/ProductsRepository')
const ProductCreateService = require('../services/ProductCreateService')
const ProductUpdateService = require('../services/ProductUpdateService')
const ProductDeleteService = require('../services/ProductDeleteService')

const IngredientsRepository = require('../repositories/IngredientsRepository')
const IngredientCreateService = require('../services/IngredientCreateService')
const IngredientUpdateService = require('../services/IngredientUpdateService')

const ImageDeleteService = require('../services/ImageDeleteService')

class ProductsController {
  async create(request, response) {
    const product = request.body

    const productsRepository = new ProductsRepository()
    const productCreateService = new ProductCreateService(productsRepository)
    const productCreated = await productCreateService.execute(product)

    // Add ingredients tags after creating the product
    const ingredientsRepository = new IngredientsRepository()
    const ingredientCreateService = new IngredientCreateService(
      ingredientsRepository
    )
    await ingredientCreateService.execute({
      ingredients: product.ingredients,
      product_id: productCreated.id,
    })
    productCreated.ingredients = product.ingredients

    return response.status(201).json(productCreated)
  }

  async update(request, response) {
    const { id } = request.params
    const product = request.body

    const productsRepository = new ProductsRepository()
    const productUpdateService = new ProductUpdateService(productsRepository)
    await productUpdateService.execute({ id, product })

    // Update ingredients tags after updating the product
    const ingredientsRepository = new IngredientsRepository()
    const ingredientUpdateService = new IngredientUpdateService(
      ingredientsRepository
    )
    await ingredientUpdateService.execute({
      ingredients: product.ingredients,
      product_id: id,
    })

    return response.status(201).json({ message: 'product-updated' })
  }

  async delete(request, response) {
    const { id } = request.params
    const productsRepository = new ProductsRepository()

    const imageDeleteService = new ImageDeleteService(productsRepository)
    const productDeleteService = new ProductDeleteService(productsRepository)

    await imageDeleteService.execute({ id })
    await productDeleteService.execute({ id })

    return response.status(201).json({ message: 'product-deleted' })
  }
}

module.exports = ProductsController
