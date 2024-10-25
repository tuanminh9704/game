const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connect = require("../configs/database");
const generateTokenHelpers = require("../helpers/generateToken");

//[POST] /auth/login
module.exports.login = async (req, res) => {
    try {
        const conn = await connect.connection();
        const userName = req.body.username;
        const password = req.body.password;

        const sqlSelectUser = `SELECT users.user_id, users.email, users.user_name, users.password FROM users WHERE user_name = ?`;

        const existUserName = (await conn.query(sqlSelectUser, [userName]))?.[0]?.[0];

        // console.log(existUserName);
        if(!existUserName){
            res.status(400).json({
                code: 400,
                message: "User name is not valid!"
            })
            return;
        }

        if(!bcrypt.compareSync(password, existUserName.password)){
            res.status(400).json({
                code: 400,
                message: "Password is incorect!"
            })
            return;
        }
        
        const accessToken = generateTokenHelpers.generateAccessToken(existUserName);
        // console.log(accessToken);

        res.json({
            code: 200,
            message: "Login successfully!",
            accessToken: accessToken
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error",
            error: error.message
        })
    }
    
}
// [POST] /auth/register
module.exports.register = async (req, res) => {
    try {
        const conn = await connect.connection();
        const newUser = req.body;
        const salt = bcrypt.genSaltSync(15);
        const passwordHashed = bcrypt.hashSync(newUser.password, salt);
        
        const sqlSelectUser = `SELECT users.email, users.user_name FROM users`;
        const sqlInsertUser = `INSERT INTO users VALUE (?, ?, ?, ?)`;

        const  users = (await conn.query(sqlSelectUser))[0];
        
        const existEmailIndex = users.findIndex(user => user.email === newUser.email);
        const existUserNameIndex = users.findIndex(user => user.user_name === newUser.username);

        if(existEmailIndex !== -1 || newUser.email.trim() === ""){
            res.status(400).json({
                code: 400,
                message: "Email is invalid!"
            })
            return;
        }
        if(existUserNameIndex !== -1 || newUser.username.trim() === ""){
            res.status(400).json({
                code: 400,
                message: "User name is invalid!",
            })
            return;
        }  
        if(newUser.password.trim().length < 6){
            res.json({
                message: "Password must not be shorter than 6 characters!"
            })
            return;
        }

        const record = await conn.query(sqlInsertUser, [newUser.id, newUser.email, newUser.username, passwordHashed]);
        console.log(sqlInsertUser);

        res.json({
            code: 200,
            message: "Success!",
            data: record
        })
        
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error,
            error: error.message
        })
    }
}