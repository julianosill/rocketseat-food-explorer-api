const bcryptjs = require('bcryptjs')
const AppError = require('../../utils/AppError')

class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }) {
    const userExists = await this.usersRepository.findByEmail(email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = email => emailRegex.test(email)

    if (userExists) {
      throw new AppError('auth/email-already-exists')
    }

    if (!name) {
      throw new AppError('auth/name-is-missing')
    }

    if (!isValidEmail(email)) {
      throw new AppError('auth/invalid-email')
    }

    if (password.length < 6) {
      throw new AppError('auth/password-too-short')
    }

    const hashedPassword = await bcryptjs.hash(password, 8)

    return await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
  }
}

module.exports = CreateUserService
