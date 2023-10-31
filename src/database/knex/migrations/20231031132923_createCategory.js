exports.up = knex => {
  return knex.schema.createTable('category', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('slug').notNullable()
  })
}

exports.down = knex => knex.schema.dropTable('category')
