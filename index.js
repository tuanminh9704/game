const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const responseWrapper = require("./middlewares/responseWrapper.middleware");

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const router = require("./routes/index.route");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(responseWrapper);

router(app);

app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})