const bcrypt = require('bcrypt');

//Adding some test users
exports.seed = async function (knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      username: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('password123', 10), //Hashing password here
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: await bcrypt.hash('password456', 10),
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      password: await bcrypt.hash('password789', 10),
    },
  ]);
};
