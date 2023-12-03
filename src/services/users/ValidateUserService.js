const AppError = require('../../utils/AppError')

class ValidateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ user }) {
    const userExists = await this.usersRepository.findById(user.id)

    if (!userExists) {
      throw new AppError('user/user-not-found', 401)
    }

    return true
  }
}

module.exports = ValidateUserService
