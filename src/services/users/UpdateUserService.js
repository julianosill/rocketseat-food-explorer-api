const bcryptjs = require('bcryptjs')
const AppError = require('../../utils/AppError')

class UpdateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ id, requestPayload }) {
    const user = await this.usersRepository.findById(id)
    const { name, email, current_password, new_password } = requestPayload
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = email => emailRegex.test(email)

    if (!user) {
      throw new AppError('auth/user-not-found')
    }

    if (email && !isValidEmail(email)) {
      throw new AppError('auth/invalid-email')
    }

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(email)
      if (emailExists && emailExists.id !== user.id) {
        throw new AppError('auth/email-already-exists')
      }
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (new_password || current_password) {
      if (!new_password) {
        throw new AppError('auth/new-password-is-missing')
      }
      if (!current_password) {
        throw new AppError('auth/current-password-is-missing')
      }
    }

    if (new_password && current_password) {
      if (new_password.length < 6) {
        throw new AppError('auth/password-too-short')
      }
      const passwordMatched = await bcryptjs.compare(
        current_password,
        user.password
      )
      if (!passwordMatched) {
        throw new AppError('auth/incorrect-password')
      }
      user.password = await bcryptjs.hash(new_password, 8)
    }

    return await this.usersRepository.update({ user })
  }
}

module.exports = UpdateUserService
