/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("records", (table) => {
    table.bigIncrements("id").primary();
    table.decimal("amount");
    table.decimal("user_balance");
    table.string("operation_response");
    table.boolean("status").defaultTo(true);

    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");

    table.integer("operation_id").unsigned();
    table.foreign("operation_id").references("operations.id");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("records");
};
