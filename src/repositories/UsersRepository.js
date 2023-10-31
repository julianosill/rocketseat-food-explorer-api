const knex = require('../database/knex')

const tableName = 'users'
class UsersRepository {
  async findById(id) {
    const user = await knex(tableName).where({ id }).first()
    return user
  }

  async findByEmail(email) {
    const user = await knex(tableName).where({ email }).first()
    return user
  }

  async create({ name, email, password }) {
    const newUser = await knex(tableName).insert({ name, email, password })
    return { id: newUser }
  }

  async update({ user }) {
    const userUpdated = await knex(tableName)
      .where({ id: user.id })
      .update(user)
    return userUpdated
  }

  async delete({ user }) {
    const userDeleted = await knex(tableName).where({ id: user.id }).delete()
    return userDeleted
  }
}

module.exports = UsersRepository
