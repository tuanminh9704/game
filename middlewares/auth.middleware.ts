import { Express, Request, Response, NextFunction } from "express";
import jwt ,{Secret, JwtPayload} from "jsonwebtoken";
const SECRET_KEY_JWT =  process.env.SECRET_KEY_JWT;

export const verifyTokenMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token :any  = authHeader && authHeader.split(' ')[1]; 

    if(!token){
        res.error("Access token is invalid!");
    }
    // console.log(tokenHeaderKey);
    jwt.verify(token, SECRET_KEY_JWT as string, (err : any, user : any) => {
        if(err){
            res.error("Access token is invalid!");
            return;
        }
        next();
    })
} 