import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";

import responseWrapper from "./middlewares/responseWrapper.middleware";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

import router from "./routes/index.route";

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