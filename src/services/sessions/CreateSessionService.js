const bcryptjs = require('bcryptjs')
const JWT = require('jsonwebtoken')

const AppError = require('../../utils/AppError')
const authConfig = require('../../configs/auth')

class CreateSessionService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = email => emailRegex.test(email)

    if (!isValidEmail(email)) {
      throw new AppError('auth/invalid-email')
    }

    if (password.length < 6) {
      throw new AppError('auth/password-too-short')
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('auth/email-or-password-incorrect', 401)
    }

    const matchPassword = await bcryptjs.compare(password, user.password)

    if (!matchPassword) {
      throw new AppError('auth/email-or-password-incorrect', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = JWT.sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    const userResponse = {
      name: user.name,
      email: user.email,
    }

    return { user: userResponse, token }
  }
}

module.exports = CreateSessionService
