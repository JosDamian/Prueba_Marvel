const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

router.get("/", (req, res) => {
  res.send({ status: "OK" });
});

router.get("/:characterName", characterController.getOneCharacter);

module.exports = router;
