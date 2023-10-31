const { Router } = require('express')

const usersRouter = require('./usersRoutes')

const routes = Router()

routes.use('/users', usersRouter)

module.exports = routes
