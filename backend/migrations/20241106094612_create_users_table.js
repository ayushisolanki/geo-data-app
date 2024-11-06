exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
  })
  .catch((error) => {
    console.error('Error creating users table:', error);
    throw error;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
