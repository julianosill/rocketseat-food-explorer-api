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
    return await knex(tableName).insert({ name, email, password })
  }

  async update({ user }) {
    const updatedUser = { ...user, updated_at: knex.fn.now() }
    return await knex(tableName).where({ id: user.id }).update(updatedUser)
  }

  async delete({ user }) {
    return await knex(tableName).where({ id: user.id }).delete()
  }
}

module.exports = UsersRepository
