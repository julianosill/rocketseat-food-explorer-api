const { Router } = require('express')

const checkAuthentication = require('../middlewares/checkAuthentication')
const checkAuthorization = require('../middlewares/checkAuthorization')

const usersRouter = require('./usersRoutes')
const sessionsRouter = require('./sessionsRoutes')
const productsRoutes = require('./productsRoutes')
const categoriesRoutes = require('./categoriesRoutes')
const ordersRoutes = require('./ordersRoutes')

const routes = Router()

routes.get('/', (request, response) => {
  return response.status(201).json({
    name: 'food-explorer-api',
    version: '1.0.0',
    description:
      'RESTful API in Node.js for an online menu system with user, product, and order management.',
    repository: 'https://github.com/julianosill/rocketseat-food-explorer-api',
  })
})

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
