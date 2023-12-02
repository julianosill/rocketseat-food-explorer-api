const bcryptjs = require('bcryptjs')
const AppError = require('../../utils/AppError')

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
      throw new AppError('auth/email-or-password-incorrect')
    }

    const matchPassword = await bcryptjs.compare(password, user.password)

    if (!matchPassword) {
      throw new AppError('auth/email-or-password-incorrect')
    }

    return { id: user.id, role: user.role }
  }
}

module.exports = CreateSessionService
