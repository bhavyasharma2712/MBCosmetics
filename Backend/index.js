import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";
 dbConnection();
dotenv.config();

//SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});