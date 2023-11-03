const ProductsRepository = require('../repositories/ProductsRepository')
const ImageUpdateService = require('../services/ImageUpdateService')

class ImageController {
  async update(request, response) {
    const { product_id } = request.params
    const imageFile = request.file

    const productsRepository = new ProductsRepository()
    const imageUpdateService = new ImageUpdateService(productsRepository)
    await imageUpdateService.execute({ product_id, imageFile })

    return response.status(201).json({ message: 'image-updated' })
  }
}

module.exports = ImageController
