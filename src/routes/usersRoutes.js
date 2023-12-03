const { Router } = require('express')

const checkAuthentication = require('../middlewares/checkAuthentication')
const checkAuthorization = require('../middlewares/checkAuthorization')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.get('/validate', checkAuthentication, usersController.validate)
usersRoutes.put(
  '/:id',
  checkAuthentication,
  checkAuthorization(['admin']),
  usersController.update
)
usersRoutes.delete(
  '/:id',
  checkAuthentication,
  checkAuthorization(['admin']),
  usersController.delete
)

module.exports = usersRoutes
