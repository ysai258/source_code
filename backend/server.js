
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


//API Endpoint

app.get('/', (req, res) => res.status(200).send(" Programmers!!!"));

app.post('/api/calulate',(req, res) =>{
    console.log(Number(req.body.fn))
    var s = parseInt(req.body.fn) + parseInt(req.body.sn);
    console.log(s);
    // res.send('hello');
    res.status(200).send(s.toString());
})



//Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`))
