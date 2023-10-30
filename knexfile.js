// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "test",
      password: "test",
      database: "test_api",
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: "./db/migrations",
    },
  },

  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      directory: "./db/migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
      port: process.env.RDS_PORT,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
  },
};
