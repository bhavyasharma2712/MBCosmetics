import express from "express";
import cors from "cors";

const app = express();

//json body
app.use(express.json());

//cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;