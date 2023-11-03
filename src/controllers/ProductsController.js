const ProductsRepository = require('../repositories/ProductsRepository')
const IngredientsRepository = require('../repositories/IngredientsRepository')

const ProductCreateService = require('../services/ProductCreateService')
const ProductUpdateService = require('../services/ProductUpdateService')
const ProductDeleteService = require('../services/ProductDeleteService')

const IngredientCreateService = require('../services/IngredientCreateService')

const ImageUpdateService = require('../services/ImageUpdateService')
const ImageDeleteService = require('../services/ImageDeleteService')

class ProductsController {
  async create(request, response) {
    const product = request.body
    const imageFile = request.file

    const productsRepository = new ProductsRepository()
    const productCreateService = new ProductCreateService(productsRepository)
    const [product_id] = await productCreateService.execute({
      product,
      imageFile,
    })

    // Add ingredients tags after creating the product
    const ingredientsRepository = new IngredientsRepository()
    const ingredientCreateService = new IngredientCreateService(
      ingredientsRepository
    )
    await ingredientCreateService.execute({
      ingredients: product.ingredients,
      product_id,
    })

    // Append image to the product
    const imageUpdateService = new ImageUpdateService(productsRepository)
    await imageUpdateService.execute({ product_id, imageFile })

    return response.status(201).json({ message: 'product-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const product = request.body

    const productsRepository = new ProductsRepository()
    const productUpdateService = new ProductUpdateService(productsRepository)
    const [product_id] = await productUpdateService.execute({ id, product })

    const ingredientsRepository = new IngredientsRepository()
    const ingredientCreateService = new IngredientCreateService(
      ingredientsRepository
    )
    await ingredientCreateService.execute({ ingredients, product_id })

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
