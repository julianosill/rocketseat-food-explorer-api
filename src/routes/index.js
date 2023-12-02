const { Router } = require('express')

const usersRouter = require('./usersRoutes')
const sessionsRouter = require('./sessionsRoutes')
const productsRoutes = require('./productsRoutes')
const categoriesRoutes = require('./categoriesRoutes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/products', productsRoutes)
routes.use('/categories', categoriesRoutes)

module.exports = routes
