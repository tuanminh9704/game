"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import rateLimit from "express-rate-limit";
const responseWrapper_middleware_1 = __importDefault(require("./middlewares/responseWrapper.middleware"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const index_route_1 = __importDefault(require("./routes/index.route"));
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 15,
// });
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(responseWrapper_middleware_1.default);
(0, index_route_1.default)(app);
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
