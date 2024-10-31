import { Express , Response} from "express";

import gameRoutes from "./game.route";
import authRoutes from "./auth.route";

const routes = (app : Express) => {

    app.use("/games", gameRoutes);

    app.use("/auth", authRoutes);
}

export default routes;