const router = require("express").Router();

const { verifySignUp, dataValidation } = require("../middlewares");
const controller = require("../controllers/auth.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [dataValidation.validateUserBody, verifySignUp.checkDuplicateUsername],
  controller.signup
);

router.post("/auth/signin", controller.signin);

module.exports = { router };
