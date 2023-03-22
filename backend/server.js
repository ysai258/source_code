import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand'

const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)
// App Config

const app = express();
const port = process.env.port || 8001;

// midde ware
app.use(express.json())
app.use(Cors());

// DB config
const connectionParams = {
useNewUrlParser: true,
useUnifiedTopology: true,
};
try {
    mongoose.connect(
        `mongodb+srv://gallasathvika2001:${process.env.mongoPassword}@cluster0.row0apk.mongodb.net/${process.env.mongodbName}?retryWrites=true&w=majority`,
        connectionParams
    );
    console.log("Database connected succesfully");
} catch (error) {
    console.log(error);
    console.log("Database connection failed");
}


//API Endpoint

app.get('/', (req, res) => res.status(200).send(" Programmers!!!"));

app.post('/api/calulate',(req, res) =>{
    let s = parseInt(req.body.fn) + parseInt(req.body.sn);
    res.status(200).send(s.toString());
})



//Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`))
