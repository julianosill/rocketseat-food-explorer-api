const AppError = require('../../utils/AppError')

class IndexOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ user }) {
    const { id, role } = user
    let orders

    if (role === 'admin') {
      orders = await this.ordersRepository.index()
    } else {
      orders = await this.ordersRepository.index(id)
    }

    if (orders.length === 0) {
      throw new AppError('order/orders-not-found')
    }

    return orders
  }
}

module.exports = IndexOrderService
