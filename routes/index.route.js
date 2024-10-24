const gameRoutes = require("./game.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {

    app.use("/games", gameRoutes);

    app.use("/auth", authRoutes);
}