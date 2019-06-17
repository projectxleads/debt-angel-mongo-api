import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import "reflect-metadata";

import apiRoutes from "./presentation/middlewares/api.middleware";
import mongodbConf from "./infrastructure/db/mongodb/mongodb.conf";

// Set Environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const mongoConnectionString = mongodbConf.remoteUrl as string || mongodbConf.db;
let mongoStatus: any;

console.log("Connect str", mongoConnectionString);
console.log("connect str env", process.env.APPSETTING_MyConnectionString);

// tslint:disable-next-line:max-line-length
mongoose.connect("mongodb://debt-angels-db:gzNuLZypXolw7ZVZvFVnQujEF3AfEokxLOuLc8AEFf42OFUuuXoozHIDxGVuSz5MNFtjK0EoMuotsIG3Vu62FA==@debt-angels-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb", { useNewUrlParser: true, useCreateIndex: true })
  .then(async (result) => {
    mongoStatus = result;
  }).catch((err) => {
    console.log(err);
    mongoStatus = err;
  });

console.log("Connected to mongo db");

// Create a new express application instance
const app = express();

// Call middleawares

// Enable cross-origin Requests
app.use(cors());

// Help us to secure our application by setting various HTTP headers
app.use(helmet());

// Parses the client's request from json into javascript objects
app.use(bodyParser.json());

// Set all routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/env", (req, res) => {
  res.send(process.env);
});

app.get("/connect-str", (req, res) => {
  res.send(mongoConnectionString);
});

app.get("/mongo-satus", (req, res) => {
  res.send(mongoStatus);
});

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
