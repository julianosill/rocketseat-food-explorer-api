exports.up = knex => {
  return knex.schema.createTable('orders', table => {
    table.increments('id')
    table
      .enum('status', ['pending', 'progress', 'delivered'], {
        useNative: true,
        enumName: 'status',
      })
      .notNullable()
      .default('pending')
    table.string('description').notNullable()
    table.integer('user_id').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

exports.down = knex => knex.schema.dropTable('orders')
