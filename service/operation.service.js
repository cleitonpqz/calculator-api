const db = require("../db/db");

const getOperation = async (id) => {
  try {
    const operation = await db("operations").where("id", id).first();
    return operation;
  } catch (error) {
    return { error };
  }
};

const OperationService = {
  getOperation,
};

module.exports = OperationService;
