const UsersRepository = require('../repositories/UsersRepository')
const UserCreateService = require('../services/UserCreateService')
const UserUpdateService = require('../services/UserUpdateService')
const UserDeleteService = require('../services/UserDeleteService')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const userCreateService = new UserCreateService(usersRepository)
    await userCreateService.execute({ name, email, password })

    return response.status(201).json({ message: 'user-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const requestPayload = request.body

    const usersRepository = new UsersRepository()
    const userUpdateService = new UserUpdateService(usersRepository)
    await userUpdateService.execute({ id, requestPayload })

    return response.status(201).json({ message: 'user-updated' })
  }

  async delete(request, response) {
    const { id } = request.params
    const { password, confirm_password } = request.body

    const usersRepository = new UsersRepository()
    const userDeleteService = new UserDeleteService(usersRepository)
    await userDeleteService.execute({ id, password, confirm_password })

    return response.status(201).json({ message: 'user-deleted' })
  }
}

module.exports = UsersController
