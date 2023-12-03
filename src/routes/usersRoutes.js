const { Router } = require('express')

const checkAuthentication = require('../middlewares/checkAuthentication')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.get('/validate', checkAuthentication, usersController.validate)
usersRoutes.put('/:id', checkAuthentication, usersController.update)
usersRoutes.delete('/:id', checkAuthentication, usersController.delete)

module.exports = usersRoutes
