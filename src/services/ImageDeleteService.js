const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class ImageDeleteService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ id }) {
    const diskStorage = new DiskStorage()
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('product/product-not-found')
    }

    const imageDeleted = await diskStorage.deleteFile(product.image)

    return imageDeleted
  }
}

module.exports = ImageDeleteService
