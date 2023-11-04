const ProductsRepository = require('../repositories/ProductsRepository')
const UpdateImageService = require('../services/images/UpdateImageService')

class ImageController {
  async update(request, response) {
    const { product_id } = request.params
    const imageFile = request.file

    const productsRepository = new ProductsRepository()
    const updateImageService = new UpdateImageService(productsRepository)
    await updateImageService.execute({ product_id, imageFile })

    return response.status(201).json({ message: 'image-updated' })
  }
}

module.exports = ImageController
