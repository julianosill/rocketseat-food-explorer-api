const knex = require('../database/knex')

const tableName = 'ingredients'

class IngredientsRepository {
  async findByProductId(product_id) {
    const ingredient = await knex(tableName)
      .where({ product_id })
      .orderBy('name')
    return ingredient
  }

  async create(tags) {
    const ingredients = await knex(tableName).insert(tags)
    return ingredients
  }

  async update({ product_id, tagsToRemove, tagsToAdd }) {
    if (tagsToRemove.length) {
      await knex(tableName)
        .delete()
        .where({ product_id })
        .whereIn('name', tagsToRemove)
    }
    if (tagsToAdd.length) {
      await knex(tableName).insert(tagsToAdd)
    }
    return
  }
}

module.exports = IngredientsRepository
