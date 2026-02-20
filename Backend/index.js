import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";
dotenv.config();

//SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log('Server is running on PORT ${5000}');
    dbConnection();
}
)