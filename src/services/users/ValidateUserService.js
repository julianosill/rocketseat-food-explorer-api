const AppError = require('../../utils/AppError')

class ValidateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ user }) {
    const userExists = await this.usersRepository.findById(user.id)

    if (!userExists) {
      throw new AppError('auth/unauthorized', 401)
    }

    return true
  }
}

module.exports = ValidateUserService