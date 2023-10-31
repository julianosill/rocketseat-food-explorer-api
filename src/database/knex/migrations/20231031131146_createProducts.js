exports.up = knex => {
  return knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('category').notNullable()
    table.integer('price').notNullable()
    table.string('image').default(null)
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

exports.down = knex => knex.schema.dropTable('products')
