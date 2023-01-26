require("dotenv").config();
import express from "express";
import config from 'config';
import connectToDb from "./utils/connentToDb";
import log from "./utils/logger";
import router from "./routes"
import deserializeUser from "./middleware/deserializeUser";

const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(deserializeUser); // get access_token from bearer token
app.use(router);
const port = config.get('port');

app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`)
    connectToDb();
});
