const jwt = require("jsonwebtoken");

module.exports.verifyTokenMiddleware = (req, res, next) => {
    // const tokenHeaderKey  = req.headers['authorization'].split(" ")[1];
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(token == null){
        res.status(401).json({
            code: 401,
            message: "Access token is invalid!"
        })
    }
    // console.log(tokenHeaderKey);
    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
        if(err){
            res.status(400).json({
                code: 400,
                message: "Access token is invalid!",
            })
            return;
        }
        next();
    })
} 