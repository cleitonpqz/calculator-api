const { email, string, object, minLength } = require("valibot");

const UserSchema = object({
  username: string([email()]),
  password: string([minLength(8)]),
});

module.exports = UserSchema;
