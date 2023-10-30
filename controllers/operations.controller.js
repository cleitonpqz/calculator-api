const db = require("../db/db");

exports.operations = (req, res) => {
  db("operations")
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
};
