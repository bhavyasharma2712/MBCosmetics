import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import dbConnection from "./utils/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//SCHEDULE SERVICES
const services = () => {
  cron.schedule("* * * * * *", () => {});
};
services();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnection();
});
