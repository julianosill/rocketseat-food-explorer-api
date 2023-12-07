const UsersRepository = require('../repositories/UsersRepository')
const CreateSessionService = require('../services/sessions/CreateSessionService')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body
    const usersRepository = new UsersRepository()
    const createSessionService = new CreateSessionService(usersRepository)
    const { user, token } = await createSessionService.execute({
      email,
      password,
    })

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    })

    return response.status(201).json({ user })
  }
}

module.exports = SessionsController
