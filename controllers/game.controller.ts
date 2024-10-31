import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

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
export const getListGame = async (req : Request, res : Response) => {
    try {
        const games = await prisma.games.findMany();
        res.success(games);
    } catch (error) {
        res.error((error as string));
        // console.log(typeof error);
    }

}

//[POST] /games
export const createGame = async (req : Request, res: Response) => {
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
        res.error((error as string));
        console.log(typeof error);
    }

    
}

//[GET] /games/:id
export const findGameById = async (req : Request, res : Response) => {
    try {
        const gameId : string = req.params.id;
        const game = await prisma.games.findMany({
            where:{
                game_id: gameId
            }
        })
        res.success(game);
    } catch (error) {
        res.error((error as string));
    }
}

//[PATCH] /games/:id
export const updateGameById = async (req : Request, res : Response) => {
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
        res.error((error as string));
    }

}

//[DELETE] /games/:id
export const deleteGameById = async (req : Request, res : Response) => {
    try {
        const gameId = req.params.id;
        const record = await prisma.games.delete({
            where: {
                game_id: gameId
            }
        })

        res.success(record);

    } catch (error) {
        res.error((error as string));
    }

}