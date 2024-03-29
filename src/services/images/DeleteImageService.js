const DiskStorage = require('../../providers/DiskStorage')
const AppError = require('../../utils/AppError')

class DeleteImageService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ id }) {
    const diskStorage = new DiskStorage()
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new AppError('product/product-not-found')
    }

    if (!product.image) {
      return
    }

    return await diskStorage.deleteFile(product.image)
  }
}

module.exports = DeleteImageService
