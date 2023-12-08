const knex = require('../database/knex')

const tableName = 'orders'

class OrdersRepository {
  async findById(id) {
    return await knex(tableName).where({ id }).first()
  }

  async index(user_id) {
    if (user_id) {
      return await knex(tableName).where({ user_id }).orderBy('id')
    }
    return await knex(tableName).orderBy('id')
  }

  async create({ description, user_id }) {
    return await knex(tableName).insert({ description, user_id })
  }
}

module.exports = OrdersRepository