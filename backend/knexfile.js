module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',               // Docker service name for the database
      user: 'postgres',         // Database user
      password: 'pgpassword', // Database password
      database: 'db',   // Database name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations', // Path to migrations directory
      tableName: 'knex_migrations'
    }
  }
};