/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("operations").del();
  await knex("operations").insert([
    { type: "addition", cost: 0.01 },
    { type: "subtraction", cost: 0.02 },
    { type: "multiplication", cost: 0.03 },
    { type: "division", cost: 0.04 },
    { type: "square_root", cost: 0.05 },
    { type: "random_string", cost: 0.1 },
  ]);
};
