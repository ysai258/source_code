const express = require("express");
const morgan = require("morgan");
const Cors = require("cors");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');

const { initDb } = require("./utils/db");
const { initAWS } = require("./utils/aws");
const itemRouter = require("./routes/items/items");
const userRouter = require("./routes/users/users");

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
// App Config

const app = express();
const port = process.env.port || 8001;
const host = "0.0.0.0";

// midde ware
app.use(morgan("dev"));
app.use(fileUpload());
app.use(express.json());
app.use(Cors({ origin:true, credentials: true }));
app.use(cookieParser());


initDb();
initAWS();

//API Endpoint

app.get("/api", (req, res) => res.status(200).send(" Programmers!!!"));

app.post("/api/calulate", (req, res) => {
  let s = parseInt(req.body.fn) + parseInt(req.body.sn);
  res.status(200).send(s.toString());
});

app.use("/api",userRouter);
app.use("/api", itemRouter);

//Listener
app.listen(port,host, () => console.log(`listening on ${host}: ${port}`));
