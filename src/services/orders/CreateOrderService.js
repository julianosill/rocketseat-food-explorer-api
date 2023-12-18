const AppError = require('../../utils/AppError')

class CreateOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ description, user_id }) {
    if (!description) {
      throw new AppError('order/description-is-missing')
    }
    if (typeof description !== 'string') {
      throw new AppError('order/description-must-be-string')
    }
    if (!user_id) {
      throw new AppError('order/user_id-is-missing')
    }

    return await this.ordersRepository.create({ description, user_id })
  }
}

module.exports = CreateOrderService
