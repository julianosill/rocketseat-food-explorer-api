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

  async findByCategory(category) {
    const products = await knex(tableName).where({ category }).orderBy('name')
    return products
  }

  async index({ search, name, category, ingredients, id }) {
    return await knex('ingredients')
      .innerJoin('products', 'products.id', 'ingredients.product_id')
      .modify(function (queryBuilder) {
        if (search) {
          queryBuilder
            .whereLike('products.name', `%${search}%`)
            .orWhereLike('ingredients.name', search)
        }
        if (id) {
          queryBuilder.whereIn('products.id', id)
        }
        if (name) {
          queryBuilder.whereLike('products.name', `%${name}%`)
        }
        if (category) {
          queryBuilder.where('products.category', category)
        }
        if (ingredients) {
          queryBuilder.whereIn('ingredients.name', ingredients)
        }
      })
      .select(
        'products.id',
        'products.name',
        'products.description',
        'products.category',
        'products.price',
        'products.image',
        'products.created_at',
        'products.updated_at'
      )
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
