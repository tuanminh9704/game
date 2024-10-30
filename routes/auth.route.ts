import {Express, Router} from "express";
const router = Router();
const controller = require("../controllers/auth.controller");

router.post("/login" , controller.login);

router.post("/register", controller.register);

export default router;