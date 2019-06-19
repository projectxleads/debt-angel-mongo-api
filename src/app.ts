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
const mongoConnectionString = mongodbConf.remoteUrl as string ||
  process.env.APPSETTING_MyConnectionString ||
  mongodbConf.db;

// tslint:disable-next-line:max-line-length
// const mongoConnectionString = "mongodb://debtangelsdb:EOZfSWfJchyT5jA98HyF7stggnD9yvXd54NOHPWpXyxPI6e0M2Lon4IB4m3EWsKgQtAvYyudioHRXpG80wzWEw==@debtangelsdb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
let mongoStatus: any;

console.log("Connect str", mongoConnectionString);
console.log("connect str env", process.env.APPSETTING_MyConnectionString);
console.log("Remote url", mongodbConf.remoteUrl);
console.log("DB", mongodbConf.db);

// tslint:disable-next-line:max-line-length
mongoose.connect(mongoConnectionString
  , { useNewUrlParser: true, useCreateIndex: true })
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
