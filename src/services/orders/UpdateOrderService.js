const AppError = require('../../utils/AppError')

class UpdateOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ id, status }) {
    if (!id) {
      throw new AppError('order/id-is-missing')
    }
    if (!status) {
      throw new AppError('order/status-is-missing')
    }

    const order = await this.ordersRepository.findById(id)

    if (!order) {
      throw new AppError('order/order-not-found')
    }

    return await this.ordersRepository.update({ id, status })
  }
}

module.exports = UpdateOrderService
