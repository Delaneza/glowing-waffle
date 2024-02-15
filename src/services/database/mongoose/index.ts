// import bluebird from "bluebird";
import { config } from "@shared/config";
import mongoose from "mongoose";

const mongodbConfig = config.mongodb;

Object.keys(mongodbConfig.options).forEach((key: any) => {
  mongoose.set(key, mongodbConfig.options[key]);
})

// mongoose.Bluebird = bluebird;

// mongoose.Types.ObjectId.prototype.view = function () {
//   return { id: this.toString() };
// }

mongoose.connection.on("error", (err) => {
  //use a logger here
  console.error("MongoDB Connection Error", err);
  process.exit(-1);
})

// mongoose.Promise = Promise

export { mongoose };
