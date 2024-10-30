"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const generateToken_1 = require("../helpers/generateToken");
const prismaQueriesLog_1 = require("../helpers/prismaQueriesLog");
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
});
(0, prismaQueriesLog_1.queryLog)(prisma);
//[POST] /auth/login
module.exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.body.username;
        const password = req.body.password;
        const existUserName = yield prisma.users.findMany({
            where: {
                user_name: userName
            }
        });
        if (!existUserName) {
            res.error("User name is not valid!");
            return;
        }
        if (!bcryptjs_1.default.compareSync(password, existUserName[0].password)) {
            res.error("Password is incorect!");
            return;
        }
        const accessToken = (0, generateToken_1.generateAccessToken)(existUserName);
        res.success(accessToken);
    }
    catch (error) {
        res.error(error);
    }
});
// [POST] /auth/register
module.exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const salt = bcryptjs_1.default.genSaltSync(15);
        const passwordHashed = bcryptjs_1.default.hashSync(newUser.password, salt);
        const existEmail = yield prisma.users.findMany({
            where: {
                email: newUser.email
            },
            select: {
                user_name: true,
                email: true,
            }
        });
        if (existEmail.length !== 0 || newUser.email.trim() === "") {
            res.error("Email is invalid!");
            return;
        }
        const existUserName = yield prisma.users.findMany({
            where: {
                user_name: newUser.username
            },
            select: {
                user_name: true,
                email: true,
            }
        });
        if (existUserName.length !== 0 || newUser.username.trim() === "") {
            res.error("User name is invalid!");
            return;
        }
        if (newUser.password.trim().length < 6) {
            res.error("Password must not be shorter than 6 characters!");
            return;
        }
        const record = yield prisma.users.create({
            data: {
                user_id: newUser.id,
                email: newUser.email,
                user_name: newUser.username,
                password: passwordHashed
            }
        });
        res.success(record);
    }
    catch (error) {
        res.error(error);
    }
});
