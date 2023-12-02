const UsersRepository = require('../repositories/UsersRepository')
const CreateSessionService = require('../services/sessions/CreateSessionService')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body
    const usersRepository = new UsersRepository()
    const createSessionService = new CreateSessionService(usersRepository)
    const sessionData = await createSessionService.execute({ email, password })
    return response.status(201).json(sessionData)
  }
}

module.exports = SessionsController
