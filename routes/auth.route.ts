import express from "express";
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/login" , controller.login);

router.post("/register", controller.register);

export default router;