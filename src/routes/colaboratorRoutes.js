const express = require("express");
const router = express.Router(); //
const colaboratorController = require("../controllers/colaboratorController");

router.get("/", (req, res) => {
  res.send({ status: "OK" });
});

router.get("/:colaboratorName", colaboratorController.getOneColaborator);

module.exports = router;
