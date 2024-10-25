const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const controller = require("../controllers/game.controller");

// router.use(authMiddleware.verifyTokenMiddleware);

router.get("/", controller.getListGame);

router.post("/", controller.createGame);

router.get("/:id", controller.findGameById);

router.patch("/:id", controller.updateGameById);

router.delete("/:id", controller.deleteGameById);

module.exports = router;