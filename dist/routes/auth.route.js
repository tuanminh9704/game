"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = require("../controllers/auth.controller");
router.post("/login", controller.login);
router.post("/register", controller.register);
exports.default = router;
