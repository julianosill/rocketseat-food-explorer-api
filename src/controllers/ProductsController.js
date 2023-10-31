const ProductsRepository = require('../repositories/ProductsRepository')
const ProductCreateService = require('../services/ProductCreateService')
const ProductUpdateService = require('../services/ProductUpdateService')
const ProductDeleteService = require('../services/ProductDeleteService')

class ProductsController {
  async create(request, response) {
    const requestData = request.body
    const productsRepository = new ProductsRepository()
    const productCreateService = new ProductCreateService(productsRepository)
    await productCreateService.execute(requestData)
    return response.status(201).json({ message: 'product-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const requestData = request.body
    const productsRepository = new ProductsRepository()
    const productUpdateService = new ProductUpdateService(productsRepository)
    await productUpdateService.execute({ id, requestData })
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
