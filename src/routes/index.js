const { Router } = require('express')

const checkAuthentication = require('../middlewares/checkAuthentication')

const usersRouter = require('./usersRoutes')
const sessionsRouter = require('./sessionsRoutes')
const productsRoutes = require('./productsRoutes')
const categoriesRoutes = require('./categoriesRoutes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/products', checkAuthentication, productsRoutes)
routes.use('/categories', checkAuthentication, categoriesRoutes)

module.exports = routes
