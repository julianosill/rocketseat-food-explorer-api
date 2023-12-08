const { Router } = require('express')

const checkAuthentication = require('../middlewares/checkAuthentication')
const checkAuthorization = require('../middlewares/checkAuthorization')

const usersRouter = require('./usersRoutes')
const sessionsRouter = require('./sessionsRoutes')
const productsRoutes = require('./productsRoutes')
const categoriesRoutes = require('./categoriesRoutes')
const ordersRoutes = require('./ordersRoutes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/products', checkAuthentication, productsRoutes)
routes.use('/orders', checkAuthentication, ordersRoutes)
routes.use(
  '/categories',
  checkAuthentication,
  checkAuthorization(['admin']),
  categoriesRoutes
)

module.exports = routes
