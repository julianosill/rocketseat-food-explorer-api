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

  async create(productData) {
    const newProduct = await knex(tableName).insert(productData)
    return newProduct
  }

  async update({ id, productData }) {
    const productUpdated = await knex(tableName)
      .where({ id })
      .update(productData)
    return productUpdated
  }

  async delete({ id }) {
    const productDeleted = await knex(tableName).where({ id }).delete()
    return productDeleted
  }
}

module.exports = ProductsRepository
