import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import dbConnection from "./utils/db.js";
import sendWelcomeEmail from "./Email Services/sendWelcomeEmail.js";
import sendpendingOrderEmail from "./Email Services/sendPendingOrderEmail.js";
import sendDeliveredOrderEmail from "./Email Services/sendDeliveredOrderEmail.js";
import sendPromotionEmail from "./Email Services/sendPromotionEmail.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
  dbConnection();

//SCHEDULE SERVICES
const services = () => {
  cron.schedule("* * * * * *", () => {});
  sendWelcomeEmail();
  sendpendingOrderEmail();
  sendDeliveredOrderEmail();
};

const promotion = () => {
  cron.schedule("15 5 * * 4", () => {});
  //sending promotion email
  sendPromotionEmail();
};
services();
promotion();

app.listen(PORT, () => {
  console.log(`Backgroundservices is running on port ${PORT}`);
});
