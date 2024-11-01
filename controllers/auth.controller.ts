import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Express, Request, Response } from "express";

import {generateAccessToken} from "../helpers/generateToken";
import {queryLog} from "../helpers/prismaQueriesLog";

const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });
  
  queryLog(prisma);

//[POST] /auth/login
export const login = async (req : Request, res : Response) => {
    try {
        const userName = req.body.username;
        const password = req.body.password;
        debugger;
        const existUserName = await prisma.users.findMany({
            where: {
                user_name: userName
            }
        })

        if(!existUserName){
            res.error("User name is not valid!");
            return;
        }

        if(!bcrypt.compareSync(password, existUserName[0].password)){
            res.error("Password is incorect!");
            return;
        }
        
        const accessToken = generateAccessToken(existUserName);
        res.success(accessToken);

    } catch (error) {
        res.error((error as string));
    }
    
}
// [POST] /auth/register
export const register = async (req : Request, res : Response) => {
    try {
        const newUser = req.body;
        const salt = bcrypt.genSaltSync(15);
        const passwordHashed = bcrypt.hashSync(newUser.password, salt);

        const  existEmail = await prisma.users.findMany({
            where: {
                email: newUser.email
            },
            select: {
                user_name: true,
                email: true,
            }
        })

        if(existEmail.length !== 0 || newUser.email.trim() === ""){
            res.error("Email is invalid!");
            return;
        }

        const existUserName = await prisma.users.findMany({
            where: {
                user_name: newUser.username
            },
            select: {
                user_name: true,
                email: true,
            }
        })

        if(existUserName.length !== 0 || newUser.username.trim() === ""){
            res.error("User name is invalid!");
            return;
        }  
        if(newUser.password.trim().length < 6){
            res.error("Password must not be shorter than 6 characters!");
            return;
        }

        const record = await prisma.users.create({
            data: {
                user_id: newUser.id,
                email: newUser.email,
                user_name: newUser.username,
                password: passwordHashed
            }
        })

        res.success(record);
        
    } catch (error) {
        res.error((error as string));
    }
}