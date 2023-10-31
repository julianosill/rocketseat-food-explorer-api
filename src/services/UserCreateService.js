const bcryptjs = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserCreateService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }) {
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) {
      throw new AppError('auth/email-already-exists')
    }
    const hashedPassword = await bcryptjs.hash(password, 8)
    const userCreated = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    return userCreated
  }
}

module.exports = UserCreateService
