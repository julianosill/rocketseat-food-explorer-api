const { Router } = require('express')

const checkAuthorization = require('../middlewares/checkAuthorization')

const OrdersController = require('../controllers/OrdersController')

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.get('/', ordersController.index)
ordersRoutes.post('/', ordersController.create)
ordersRoutes.put('/', checkAuthorization(['admin']), ordersController.update)

module.exports = ordersRoutes
