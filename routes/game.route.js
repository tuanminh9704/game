const express = require("express");
const router = express.Router();

const controller = require("../controllers/game.controller");

router.get("/", controller.game);

router.post("/", controller.createGame);

router.get("/:id", controller.findGame);

router.patch("/:id", controller.updateGame);

router.delete("/:id", controller.deleteGame);

module.exports = router;