const UsersRepository = require('../repositories/UsersRepository')
const CreateUserService = require('../services/users/CreateUserService')
const UpdateUserService = require('../services/users/UpdateUserService')
const DeleteUserService = require('../services/users/DeleteUserService')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body
    const usersRepository = new UsersRepository()
    const createUserService = new CreateUserService(usersRepository)
    await createUserService.execute({ name, email, password })
    return response.status(201).json({ message: 'user-created' })
  }

  async update(request, response) {
    const { id } = request.params
    const requestPayload = request.body
    const usersRepository = new UsersRepository()
    const updateUserService = new UpdateUserService(usersRepository)
    await updateUserService.execute({ id, requestPayload })
    return response.status(201).json({ message: 'user-updated' })
  }

  async delete(request, response) {
    const { id } = request.params
    const { password, confirm_password } = request.body
    const usersRepository = new UsersRepository()
    const deleteUserService = new DeleteUserService(usersRepository)
    await deleteUserService.execute({ id, password, confirm_password })
    return response.status(201).json({ message: 'user-deleted' })
  }
}

module.exports = UsersController
