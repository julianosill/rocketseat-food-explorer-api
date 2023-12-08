const AppError = require('../../utils/AppError')

class ValidateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ user }) {
    const userRegistered = await this.usersRepository.findById(user.id)

    if (!userRegistered) {
      throw new AppError('auth/user-not-found', 401)
    }

    const { name, email, role } = userRegistered

    return { name, email, role }
  }
}

module.exports = ValidateUserService
