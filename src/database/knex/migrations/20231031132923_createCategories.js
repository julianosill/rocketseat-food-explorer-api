exports.up = knex => {
  return knex.schema.createTable('categories', table => {
    table.increments('id')
    table.string('name').notNullable()
  })
}

exports.down = knex => knex.schema.dropTable('categories')
