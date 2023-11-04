const ProductsRepository = require('../repositories/ProductsRepository')
const IndexProductService = require('../services/products/IndexProductService')
const CreateProductService = require('../services/products/CreateProductService')
const UpdateProductService = require('../services/products/UpdateProductService')
const DeleteProductService = require('../services/products/DeleteProductService')

const IngredientsRepository = require('../repositories/IngredientsRepository')
const CreateIngredientService = require('../services/ingredients/CreateIngredientService')
const UpdateIngredientService = require('../services/ingredients/UpdateIngredientService')

const DeleteImageService = require('../services/images/DeleteImageService')

class ProductsController {
  async index(request, response) {
    const requestQuery = request.query

    const productsRepository = new ProductsRepository()
    const indexProductService = new IndexProductService(productsRepository)
    const products = await indexProductService.execute(requestQuery)

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
    const createProductService = new CreateProductService(productsRepository)
    const productCreated = await createProductService.execute(product)

    // Add ingredients tags after creating the product
    const ingredientsRepository = new IngredientsRepository()
    const createIngredientService = new CreateIngredientService(
      ingredientsRepository
    )
    await createIngredientService.execute({
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
    const updateProductService = new UpdateProductService(productsRepository)
    await updateProductService.execute({ id, product })

    // Update ingredients tags after updating the product
    const ingredientsRepository = new IngredientsRepository()
    const updateIngredientService = new UpdateIngredientService(
      ingredientsRepository
    )
    await updateIngredientService.execute({
      ingredients: product.ingredients,
      product_id: id,
    })

    return response.status(201).json({ message: 'product-updated' })
  }

  async delete(request, response) {
    const { id } = request.params
    const productsRepository = new ProductsRepository()

    const deleteImageService = new DeleteImageService(productsRepository)
    const deleteProductService = new DeleteProductService(productsRepository)

    await deleteImageService.execute({ id })
    await deleteProductService.execute({ id })

    return response.status(201).json({ message: 'product-deleted' })
  }
}

module.exports = ProductsController
