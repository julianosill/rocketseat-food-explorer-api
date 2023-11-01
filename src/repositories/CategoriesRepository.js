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
    const newCategory = await knex(tableName).insert(categoryData)
    return newCategory
  }

  async update({ id, name }) {
    const categoryUpdated = await knex(tableName).where({ id }).update({ name })
    return categoryUpdated
  }

  async delete({ id }) {
    const categoryDeleted = await knex(tableName).where({ id }).delete()
    return categoryDeleted
  }
}

module.exports = CategoriesRepository
