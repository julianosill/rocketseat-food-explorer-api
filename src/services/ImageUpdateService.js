const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class ImageUpdateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ product_id, imageFile }) {
    if (!product_id) {
      throw new AppError('image/product-id-is-missing')
    }

    if (!imageFile) {
      throw new AppError('image/image-is-missing')
    }

    const diskStorage = new DiskStorage()
    const product = await this.productsRepository.findById(product_id)

    if (!product) {
      const isTmpFile = true
      await diskStorage.deleteFile(imageFile.filename, isTmpFile)
      throw new AppError('product/product-not-found')
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image)
    }

    const filename = await diskStorage.saveFile(imageFile.filename)
    product.image = filename

    await this.productsRepository.update({ id: product_id, product })

    return product.image
  }
}

module.exports = ImageUpdateService
