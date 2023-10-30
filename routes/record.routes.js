const router = require("express").Router();

const { authJWT, dataValidation } = require("../middlewares");
const controller = require("../controllers/records.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/records",
  [authJWT.verifyToken, dataValidation.validateRecordBody],
  controller.createRecord
);

router.get("/records", [authJWT.verifyToken], controller.getRecords);

router.delete("/records/:id", [authJWT.verifyToken], controller.deleteRecord);
module.exports = { router };
