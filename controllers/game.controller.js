const { query } = require("express");
const connect = require("../configs/database");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const prismaQueriesLog = require("../helpers/prismaQueriesLog");


const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prismaQueriesLog.queryLog(prisma);

//[GET] /games
module.exports.getListGame = async (req, res) => {
    try {
        const games = await prisma.games.findMany();
        res.success(games);
    } catch (error) {
        res.error(error.message);
    }

}

//[POST] /games
module.exports.createGame = async (req, res) => {
    try {
        const newGame = req.body;
        
        if(newGame.title.trim() === "" || newGame.genre.trim() === "" || isNaN(newGame.price) || newGame.price < 0){
            res.error("Title or genre is invalid");
            return;
        }
        const record = await prisma.games.create({
            data: newGame
        });

        res.success(record);

    } catch (error) {
        res.error(error.message);
    }

    
}

//[GET] /games/:id
module.exports.findGameById = async (req, res) => {
    try {
        const gameId = req.params.id;

        const game = await prisma.games.findMany({
            where:{
                game_id: gameId
            }
        })
        res.success(game);
    } catch (error) {
        res.error(error.message);
    }
}

//[PATCH] /games/:id
module.exports.updateGameById = async (req, res) => {
    try {
        const gameId = req.params.id;
        const {title, genre, price} = req.body;

        if(title.trim() === "" || genre.trim() === "" || isNaN(price) || price < 0){
            res.error('title, genre or price is invalid');
            return;
        }
    
        const game = await prisma.games.update({
            where: {
                game_id: gameId
            },
            data: req.body
        })
        res.success(game);

    } catch (error) {
        res.error(error.message);
    }

}

//[DELETE] /games/:id
module.exports.deleteGameById = async (req, res) => {
    try {
        const gameId = req.params.id;
        const record = await prisma.games.delete({
            where: {
                game_id: gameId
            }
        })

        res.success(record);

    } catch (error) {
        res.error(error.message);
    }

}