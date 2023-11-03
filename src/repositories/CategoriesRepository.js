const knex = require('../database/knex')

const tableName = 'categories'

class CategoriesRepository {
  async findById(id) {
    const category = await knex(tableName).where({ id }).first()
    return category
  }

  async findByName(name) {
    const category = await knex(tableName).where({ name }).first()
    return category
  }

  async create(categoryData) {
    return await knex(tableName).insert(categoryData)
  }

  async update({ id, name }) {
    return await knex(tableName).where({ id }).update({ name })
  }

  async delete({ id }) {
    return await knex(tableName).where({ id }).delete()
  }
}

module.exports = CategoriesRepository
