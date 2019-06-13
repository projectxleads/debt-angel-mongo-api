import "reflect-metadata";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import apiRoutes from './presentation/middlewares/api.middleware';

// Set Environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING as string;

mongoose.connect(mongoConnectionString)
  .then(async (result) => {
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

    app.use('/api', apiRoutes);

    app.listen(port, () => {
      console.log(`Server start at http://localhost:${port}`);
    });
  }).catch(err => console.log(err));
