const connect = require("../configs/database");


//[GET] /games
module.exports.getListGame = async (req, res) => {
    try {
        const sql = "SELECT * FROM games"
        const conn = await connect.connection();
        const records = await conn.execute(sql);

        res.json({
            code: 200,
            message: "Success!",
            data: records[0],
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error",
            error: error.message
        })
    }

}

//[POST] /games
module.exports.createGame = async (req, res) => {
    try {
        const conn = await connect.connection();
        let sql = `INSERT INTO games (game_id, title, genre, price) VALUES (?, ?, ?, ?)`;
        const newGame = req.body;
        const values = Object.values(newGame);
        // console.log(values);
        
        if(newGame.title.trim() === "" || newGame.genre.trim() === "" || isNaN(newGame.price) || newGame.price < 0){
            res.json({
                code: 500,
                message: "Title or genre is invalid"
            })
        }
        await conn.query(sql, values);

        res.json({
            code: 200,
            message: "Success!",
            data: newGame
        })

    } catch (error) {
        res.json({
            code: 500,
            message: "Error!",
            error: error.message
        })
    }

    
}

//[GET] /games/:id
module.exports.findGameById = async (req, res) => {
    try {
        const conn = await connect.connection();
        const gameId = parseInt(req.params.id);
        const sql = `SELECT * FROM games WHERE game_id = ?`;
        
        const game = await conn.query(sql, [gameId]);
        res.json({
            code: 200,
            message: "Success!",
            data: game[0]
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error!",
            error: error.message
        })
    }
}

//[PATCH] /games/:id
module.exports.updateGameById = async (req, res) => {
    try {
        const conn = await connect.connection();
        const gameId = req.params.id;
        const {title, genre, price} = req.body;
        const keysArray = Object.keys(req.body).map(key => `${key} = ? `).join(", ")
        const sql = `UPDATE games SET ${keysArray} WHERE game_id = ?`;
        const valuesArray = Object.values(req.body);

        if(title.trim() === "" || genre.trim() == "" || isNaN(price) || price < 0){
            res.json({
                code: 500,
                message: "title, genre or price is invalid"
            })
        }
        else{
            await conn.query(sql, [gameId, ...valuesArray]);
        }

        res.json({
            code: 200,
            message: "Success!",
        })
    } catch (error) {
        res.json({
            code: 500,
            message: "Error!",
            error: error.message
        })
    }

}

//[DELETE] /games/:id
module.exports.deleteGameById = async (req, res) => {
    try {
        const gameId = req.params.id;
        const conn = await connect.connection();
        const sql = `DELETE FROM games WHERE game_id = ?`;
        const record = await conn.query(sql, [gameId]);

        res.json({
            code: 200,
            message: "Success!",
            data: record
        })
    } catch (error) {
        res.json.status(500)({
            code: 500,
            message: "Error",
            error: error.message
        })
    }

}