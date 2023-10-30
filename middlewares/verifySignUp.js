const { safeParse } = require("valibot");
const db = require("../db/db.js");
const UserSchema = require("../model/user.schema.js");

checkDuplicateUsername = async (req, res, next) => {
  const username = req.body.username;
  try {
    const user = await db("users").where("username", username).first();
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use.",
      });
      return;
    }
  } catch (error) {}
  next();
};

const verifySignUp = {
  checkDuplicateUsername,
};

module.exports = verifySignUp;
