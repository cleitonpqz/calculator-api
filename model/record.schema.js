const { string, object, number } = require("valibot");

const RecordSchema = object({
  operation_id: number("Operation must be provided with number type"),
  amount: number("Amount must be provided with number type"),
  user_balance: number("User balance must be provided with number type"),
});

module.exports = RecordSchema;
