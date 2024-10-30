"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const generateAccessToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user.user_id }, SECRET_KEY_JWT, { expiresIn: '1h' });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
