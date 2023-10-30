const { MySqlContainer } = require("@testcontainers/mysql");
let container;
module.exports = async (globalConfig) => {
  container = await new MySqlContainer()
    .withUsername("test")
    .withUserPassword("test")
    .withDatabase("test_api")
    .start();
  global.__container = container;

  process.env.DB_PORT = container.getPort();
  const knexTestConfig = require("../../knexfile")["test"];
  knexTestSetup = require("knex")(knexTestConfig);
  global.__knex = knexTestSetup;
  await knexTestSetup.migrate.latest();
  await knexTestSetup.seed.run();
};
