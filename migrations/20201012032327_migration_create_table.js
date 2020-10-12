exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email", 255).notNullable();
      table.string("username", 255).notNullable();
      table.string("firstname", 255).notNullable();
      table.string("lastname", 255).notNullable();
      table.string("password", 255).notNullable();
      table.boolean("active").notNullable().defaultTo(true);
      table.timestamp("created_on").defaultTo(knex.fn.now());
    })
    .createTable("roles", function (table) {
      table.increments("id").primary();
      table.string("description", 255).notNullable();
    })
    .createTable("user_roles", function (table) {
      table.increments("id").primary();
      table.integer("role_id").references("id").inTable("roles").notNullable();
      table.integer("user_id").references("id").inTable("users").notNullable();
    })
    .createTable("movies", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("gender").notNullable();
      table.string("stars").notNullable();
      table.string("directors").notNullable();
      table.string("description").notNullable();
      table.string("release_year").defaultTo(knex.fn.now());
    })
    .createTable("rating", function (table) {
      table.increments("id").primary();
      table.integer("rating").notNullable();
      table
        .integer("movies_id")
        .references("id")
        .inTable("movies")
        .notNullable();
      table.integer("user_id").references("id").inTable("users").notNullable();
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable("users")
    .dropTable("roles")
    .dropTable("user_roles")
    .dropTable("movies")
    .dropTable("rating");
};

exports.config = { transaction: false };
