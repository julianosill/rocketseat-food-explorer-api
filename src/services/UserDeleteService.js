const bcryptjs = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserDeleteService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ id, password, confirm_password }) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('auth/user-not-found')
    }

    if (password !== confirm_password) {
      throw new AppError('auth/password-does-not-match')
    }

    const correctPassword = await bcryptjs.compare(password, user.password)

    if (!correctPassword) {
      throw new AppError('auth/incorrect-password')
    }

    return await this.usersRepository.delete({ user })
  }
}

module.exports = UserDeleteService
