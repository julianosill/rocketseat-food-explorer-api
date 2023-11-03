const knex = require('../database/knex')

const tableName = 'products'

class ProductsRepository {
  async findById(id) {
    const product = await knex(tableName).where({ id }).first()
    return product
  }

  async findByName(name) {
    const product = await knex(tableName).where({ name }).first()
    return product
  }

  async create(product) {
    const productCreated = await knex(tableName).insert(product)
    return productCreated
  }

  async update({ id, product }) {
    const productUpdated = await knex(tableName).where({ id }).update(product)
    return productUpdated
  }

  async delete({ id }) {
    const productDeleted = await knex(tableName).where({ id }).delete()
    return productDeleted
  }
}

module.exports = ProductsRepository
