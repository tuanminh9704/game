"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_route_1 = __importDefault(require("./game.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const routes = (app) => {
    app.use("/games", game_route_1.default);
    app.use("/auth", auth_route_1.default);
};
exports.default = routes;
