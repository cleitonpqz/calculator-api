const router = require("express").Router();

const { authJWT } = require("../middlewares");
const controller = require("../controllers/operations.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/operations", [authJWT.verifyToken], controller.operations);

module.exports = { router };
