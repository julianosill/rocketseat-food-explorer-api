const bcryptjs = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserUpdateService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ id, requestPayload }) {
    const user = await this.usersRepository.findById(id)
    const { name, email, current_password, new_password } = requestPayload

    if (!user) {
      throw new AppError('auth/user-not-found')
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
        throw new AppError('auth/password-does-not-match')
      }
      user.password = await bcryptjs.hash(new_password, 8)
    }

    const userUpdated = await this.usersRepository.update({ user })

    return userUpdated
  }
}

module.exports = UserUpdateService
