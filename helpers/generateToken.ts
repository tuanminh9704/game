import jwt ,{Secret, JwtPayload} from "jsonwebtoken";
const SECRET_KEY_JWT =  process.env.SECRET_KEY_JWT;

export const generateAccessToken = (user : any) => {
    const accessToken = jwt.sign({id: user.user_id}, SECRET_KEY_JWT as string, {expiresIn: '1h'});

    return accessToken;
}