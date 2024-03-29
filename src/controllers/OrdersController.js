const OrdersRepository = require('../repositories/OrdersRepository')
const IndexOrderService = require('../services/orders/IndexOrderService')
const CreateOrderService = require('../services/orders/CreateOrderService')
const UpdateOrderService = require('../services/orders/UpdateOrderService')

class OrdersController {
  async index(request, response) {
    const { user } = request
    const ordersRepository = new OrdersRepository()
    const indexOrderService = new IndexOrderService(ordersRepository)
    const orders = await indexOrderService.execute({ user })
    return response.status(201).json(orders)
  }

  async create(request, response) {
    const { user } = request
    const { description } = request.body
    const ordersRepository = new OrdersRepository()
    const createOrderService = new CreateOrderService(ordersRepository)
    await createOrderService.execute({ description, user_id: user.id })
    return response.status(201).json({ message: 'order-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const { status } = request.body
    const ordersRepository = new OrdersRepository()
    const updateOrderService = new UpdateOrderService(ordersRepository)
    await updateOrderService.execute({ id, status })
    return response.status(201).json({ message: 'order-updated' })
  }
}

module.exports = OrdersController
