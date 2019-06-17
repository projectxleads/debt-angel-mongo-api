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
const mongoConnectionString = process.env.CUSTOMCONNSTR_MyConnectionString as string || mongodbConf.db;

console.log("DB", mongodbConf.db);

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useCreateIndex: true })
  .then(async (result) => {
    // console.log("Connected to mongo db");

    // // Create a new express application instance
    // const app = express();

    // // Call middleawares

    // // Enable cross-origin Requests
    // app.use(cors());

    // // Help us to secure our application by setting various HTTP headers
    // app.use(helmet());

    // // Parses the client's request from json into javascript objects
    // app.use(bodyParser.json());

    // // Set all routes
    // app.get("/", (req, res) => {
    //   res.send("Hello world");
    // });

    // app.use("/api", apiRoutes);

    // app.listen(port, () => {
    //   console.log(`Server start at http://localhost:${port}`);
    // });
  }).catch((err) => console.log(err));

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
  res.send(process.env);
});

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
