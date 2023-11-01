const knex = require('../database/knex')

const tableName = 'ingredients'

class IngredientsRepository {
  async create(tags) {
    const ingredients = await knex(tableName).insert(tags)
    return ingredients
  }
}

module.exports = IngredientsRepository
