const games = [
    {   
        gameId: 1,
        title: "Age of empires",
        genre: "Strategy",
        price: 500,
    }, 
    {
        gameId: 2,
        title: "CSGO",
        genre: "Strategy",
        price: 200,
    }
]

//[GET] /games
module.exports.game = (req, res) => {
    try {
        const records = games.map(item => item);
        // console.log(getGame);
        res.json({
            code: 200,
            message: "Success!",
            data: records,
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
module.exports.createGame = (req, res) => {
    try {
        const newGame = req.body;

        if(newGame.title == "" || newGame.genre == ""){
            res.json({
                code: 500,
                message: "Title or genre is null"
            })
        }
        games.push(newGame);

        res.json({
            code: 200,
            message: "Success!",
            data: newGame
        })

    } catch (error) {
        res.json.status(500)({
            code: 500,
            message: "Error!",
            error: error.message
        })
    }

    
}

//[GET] /games/:id
module.exports.findGame = (req, res) => {
    try {
        const gameId = parseInt(req.params.id);
        const game = games.find(item => item.gameId === gameId);
        // console.log(game);
        res.json({
            code: 200,
            message: "Success!",
            data: game
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
module.exports.updateGame = (req, res) => {
    try {
        const gameId = parseInt(req.params.id);
        const {title, genre, price} = req.body;

        const game = games.find(item => item.gameId === gameId);
        if(title){
            game.title = title;
        }
        if(genre){
            game.genre = genre;
        }
        if(price){
            game.price = price;
        }

        res.json({
            code: 200,
            message: "Success!",
            data: game
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
module.exports.deleteGame = (req, res) => {
    try {
        const gameId = parseInt(req.params.id);
        const gameIndex = games.findIndex(item => item.gameId === gameId);
        games.splice(gameIndex);
        res.json({
            code: 200,
            message: "Success!",
            data: games
        })
    } catch (error) {
        res.json.status(500)({
            code: 500,
            message: "Error",
            error: error.message
        })
    }

}