const express = require("express");
const bodyParser = require("body-parser");

require('dotenv').config()

const app = express();
const port = process.env.PORT

const router = require("./routes/index.route");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


router(app);

app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})