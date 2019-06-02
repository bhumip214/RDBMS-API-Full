// what changes are to be applied to the database
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // primary key called id, integer, auto-increment
    tbl.increments();

    tbl.text("name", 128).notNullable();

    tbl.timestamps(true, true);
  });
};

// how can I undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
