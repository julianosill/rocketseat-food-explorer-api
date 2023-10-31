const knex = require('../database/knex')

class UsersRepository {
  async findById(id) {
    const user = await knex('users').where({ id }).first()
    return user
  }

  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()
    return user
  }

  async create({ name, email, password }) {
    const newUser = await knex('users').insert({ name, email, password })
    return { id: newUser }
  }

  async update({ user }) {
    const userUpdated = await knex('users').where({ id: user.id }).update(user)
    return userUpdated
  }

  async delete({ user }) {
    const userDeleted = await knex('users').where({ id: user.id }).delete()
    return userDeleted
  }
}

module.exports = UsersRepository
