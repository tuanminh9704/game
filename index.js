"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
// import rateLimit from "express-rate-limit";
var responseWrapper_middleware_1 = require("./middlewares/responseWrapper.middleware");
require('dotenv').config();
var app = (0, express_1.default)();
var port = process.env.PORT;
var index_route_1 = require("./routes/index.route");
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 15,
// });
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(responseWrapper_middleware_1.default);
(0, index_route_1.default)(app);
app.use(express_1.default.json());
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
