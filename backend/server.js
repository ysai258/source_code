import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { InventoryModel } from "./Models/Inventory.js";
import { StatusCodes } from "http-status-codes";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
// App Config

const app = express();
const port = process.env.port || 8001;

// midde ware
app.use(express.json());
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

app.get("/", (req, res) => res.status(200).send(" Programmers!!!"));

app.post("/api/calulate", (req, res) => {
  let s = parseInt(req.body.fn) + parseInt(req.body.sn);
  res.status(200).send(s.toString());
});

// POST request to add Inventory to database
app.post("/addItem", async (req, res) => {
  try {
    // Create a new instance of the Inventory Model with data from the request body
    const inventory = InventoryModel(req.body);
    // Save the data to the database
    await inventory.save(function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
        return;
      }
      // Send a success response with the added data
      res.status(StatusCodes.CREATED).json(result);
    });
  } catch (err) {
    // Send an error response if there is a problem adding the data
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

// POST request to update Inventory to database
app.post("/updateItem", async (req, res) => {
  try {
    const id = req.body._id;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const result = await InventoryModel.updateOne(
      { _id: id },
      { $set: { name: name, quantity: quantity } }
    );
    // Send a success response with the result
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    // Send an error response if there is a problem updating
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

// GET request to get Inventory from database
app.get("/getItems", async (req, res) => {
  try {

    // Find items in the collection with pagination options
    const items = await InventoryModel.find();

    // Send a success response with the retrieved data and pagination info
    const totalCount = await InventoryModel.countDocuments();
    const response = {
      totalCount,
      items,
    };
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    // Send an error response if there is a problem retrieving the data
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
