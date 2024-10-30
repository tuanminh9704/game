"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.error("Access token is invalid!");
    }
    // console.log(tokenHeaderKey);
    jsonwebtoken_1.default.verify(token, SECRET_KEY_JWT, (err, user) => {
        if (err) {
            res.error("Access token is invalid!");
            return;
        }
        next();
    });
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
