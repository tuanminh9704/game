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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListGame = void 0;
const client_1 = require("@prisma/client");
const prismaQueriesLog = require("../helpers/prismaQueriesLog");
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
});
prismaQueriesLog.queryLog(prisma);
//[GET] /games
const getListGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield prisma.games.findMany();
        res.success(games);
    }
    catch (error) {
        res.error(error);
        // console.log(typeof error);
    }
});
exports.getListGame = getListGame;
//[POST] /games
module.exports.createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGame = req.body;
        if (newGame.title.trim() === "" || newGame.genre.trim() === "" || isNaN(newGame.price) || newGame.price < 0) {
            res.error("Title or genre is invalid");
            return;
        }
        const record = yield prisma.games.create({
            data: newGame
        });
        res.success(record);
    }
    catch (error) {
        res.error(error);
        console.log(typeof error);
    }
});
//[GET] /games/:id
module.exports.findGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const game = yield prisma.games.findMany({
            where: {
                game_id: gameId
            }
        });
        res.success(game);
    }
    catch (error) {
        res.error(error);
    }
});
//[PATCH] /games/:id
module.exports.updateGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const { title, genre, price } = req.body;
        if (title.trim() === "" || genre.trim() === "" || isNaN(price) || price < 0) {
            res.error('title, genre or price is invalid');
            return;
        }
        const game = yield prisma.games.update({
            where: {
                game_id: gameId
            },
            data: req.body
        });
        res.success(game);
    }
    catch (error) {
        res.error(error);
    }
});
//[DELETE] /games/:id
module.exports.deleteGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const record = yield prisma.games.delete({
            where: {
                game_id: gameId
            }
        });
        res.success(record);
    }
    catch (error) {
        res.error(error);
    }
});
