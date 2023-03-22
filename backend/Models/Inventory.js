import mongoose from "mongoose";
import {INVENTORY_COLLECTION} from "../Constants/constants.js";

// Define schema for Inventory to be stored in the database
const Inventory = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img_s3path: {
    type: String,
    required: true,
  },
});

// Define model for the Inventory schema
export const InventoryModel = mongoose.model(
  INVENTORY_COLLECTION,
  Inventory
);
