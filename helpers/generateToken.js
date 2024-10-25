const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (user) => {
    const accessToken = jwt.sign({id: user.user_id}, process.env.SECRET_KEY_JWT, {expiresIn: '1h'});

    return accessToken;
}