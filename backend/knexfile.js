const knex = require('knex')({
  client: 'pg', // or your database client
  connection: {
      host: 'localhost',
      user: 'your-username',
      password: 'your-password',
      database: 'your-database-name',
  },
});

module.exports = knex;
