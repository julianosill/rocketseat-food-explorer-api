const { Router } = require('express')

const usersRouter = require('./usersRoutes')
const productsRoutes = require('./productsRoutes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/products', productsRoutes)

module.exports = routes
