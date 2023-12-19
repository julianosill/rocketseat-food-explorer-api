const knex = require('../database/knex')

const tableName = 'users'
class UsersRepository {
  async hasAnyUser() {
    const user = await knex(tableName).first()
    return user
  }

  async findById(id) {
    const user = await knex(tableName).where({ id }).first()
    return user
  }

  async findByEmail(email) {
    const user = await knex(tableName).where({ email }).first()
    return user
  }

  async create({ user }) {
    return await knex(tableName).insert(user)
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
