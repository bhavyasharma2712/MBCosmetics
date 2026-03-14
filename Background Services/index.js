import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import dbConnection from "./utils/db.js";
import sendWelcomeEmail from "./Email Services/sendWelcomeEmail.js";
import sendpendingOrderEmail from "./Email Services/sendpendingOrderEmail.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
  dbConnection();

//SCHEDULE SERVICES
const services = () => {
  cron.schedule("* * * * * *", () => {});
  sendWelcomeEmail();
  sendpendingOrderEmail();
};
services();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
