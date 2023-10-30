const { safeParse } = require("valibot");
const UserSchema = require("../model/user.schema.js");
const RecordSchema = require("../model/record.schema.js");

const validateUserBody = (req, res, next) => {
  const result = safeParse(UserSchema, req.body);
  if (!result.success) {
    const errors = [];
    result.issues.forEach(({ message, path }) => {
      errors.push(`${message} for field ${path[0].key}`);
    });
    res.status(400).send({ message: "Failed! See error messages.", errors });
    return;
  }
  next();
};

const validateRecordBody = (req, res, next) => {
  const result = safeParse(RecordSchema, req.body);
  if (!result.success) {
    const errors = [];
    result.issues.forEach(({ message }) => {
      errors.push(message);
    });
    res.status(400).send({ message: "Failed! See error messages.", errors });
    return;
  }
  next();
};

const dataValidation = {
  validateUserBody,
  validateRecordBody,
};

module.exports = dataValidation;
