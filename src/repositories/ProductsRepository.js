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

  async index({ name, category, tags }) {
    return await knex('ingredients')
      .innerJoin('products', 'products.id', 'ingredients.product_id')
      .modify(function (queryBuilder) {
        if (name) {
          queryBuilder.whereLike('products.name', `%${name}%`)
        }
        if (category) {
          queryBuilder.where('products.category', category)
        }
        if (tags) {
          queryBuilder.whereIn('ingredients.name', tags)
        }
      })
      .groupBy('products.id')
      .orderBy('products.name')
  }

  async create(product) {
    return await knex(tableName).insert(product)
  }

  async update({ id, product }) {
    const updatedProduct = { ...product, updated_at: knex.fn.now() }
    return await knex(tableName).where({ id }).update(updatedProduct)
  }

  async delete({ id }) {
    return await knex(tableName).where({ id }).delete()
  }
}

module.exports = ProductsRepository
