import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/error.js";
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"

const app = express();

//cors
app.use(cors());

//json body
app.use(express.json());

//cookie-parser
app.use(cookieParser());

//routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/products", productRoute);


//error middleware
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
