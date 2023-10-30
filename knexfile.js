require('dotenv').config()
const path = require('path')

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', process.env.DB_NAME),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      ),
    },
    useNullAsDefault: true,
  },
}
