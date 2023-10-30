const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const db = require("../db/db");

exports.signup = (req, res) => {
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
  };

  //registering new user
  db("users")
    .returning("id")
    .insert(user)
    .then((result) => {
      res.status(201).send({ message: "User was registered successfully!" });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
};

exports.signin = (req, res) => {
  db("users")
    .where({ username: req.body.username, status: true })
    .first()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
};
