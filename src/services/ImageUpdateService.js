const DiskStorage = require('../providers/DiskStorage')

class ImageUpdateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ product_id, imageFile }) {
    const diskStorage = new DiskStorage()
    const product = await this.productsRepository.findById(product_id)

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
