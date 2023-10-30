const knex = require("knex");
const knexFile = require("../knexfile");
const { attachPaginate } = require("knex-paginate");

const environment = process.env.NODE_ENV || "production";

const db = knex(knexFile[environment]);

attachPaginate();

module.exports = db;
