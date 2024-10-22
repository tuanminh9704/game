const gameRoutes = require("./game.route");

module.exports = (app) => {
    app.use("/games", gameRoutes);
}