const ProductsRepository = require('../repositories/ProductsRepository')
const ProductIndexService = require('../services/ProductIndexService')
const ProductCreateService = require('../services/ProductCreateService')
const ProductUpdateService = require('../services/ProductUpdateService')
const ProductDeleteService = require('../services/ProductDeleteService')

const IngredientsRepository = require('../repositories/IngredientsRepository')
const IngredientCreateService = require('../services/IngredientCreateService')
const IngredientUpdateService = require('../services/IngredientUpdateService')

const ImageDeleteService = require('../services/ImageDeleteService')

class ProductsController {
  async index(request, response) {
    const requestQuery = request.query

    const productsRepository = new ProductsRepository()
    const productIndexService = new ProductIndexService(productsRepository)
    const products = await productIndexService.execute(requestQuery)

    const ingredientsRepository = new IngredientsRepository()
    const ingredients = await ingredientsRepository.index()

    const productsWithIngredients = products.map(product => {
      const tags = ingredients
        .filter(tag => tag.product_id === product.id)
        .map(tag => tag.name)
      return { ...product, ingredients: tags }
    })

    return response.status(200).json(productsWithIngredients)
  }

  async show(request, response) {
    const { id } = request.params

    const productsRepository = new ProductsRepository()
    const product = await productsRepository.findById(id)

    const ingredientsRepository = new IngredientsRepository()
    const ingredients = await ingredientsRepository.findByProductId(id)

    const tags = ingredients.map(tag => tag.name)
    const productWithIngredients = { ...product, ingredients: tags }

    return response.status(200).json(productWithIngredients)
  }

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
