import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";
 dbConnection();
dotenv.config();

//SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT ${PORT}`);
});