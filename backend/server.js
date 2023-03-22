require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

// App Config

const app = express();
const port = process.env.port || 8001;

// midde ware
app.use(express.json())
app.use(Cors());
// DB config

//mongodb integration
const url = `mongodb+srv://gallasathvika2001:${process.env.mongoPassword}@cluster0.row0apk.mongodb.net/${process.env.mongodbName}?retryWrites=true&w=majority`;

mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('MongoDB connected');
})

//API Endpoint

app.get('/', (req, res) => res.status(200).send(" Programmers!!!"));

app.post('/api/calulate',(req, res) =>{
    let s = parseInt(req.body.fn) + parseInt(req.body.sn);
    res.status(200).send(s.toString());
})



//Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`))
