require("dotenv").config();
const express  = require("express");
const cors = require("cors");
const connectDB = require("./src/db");
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5005;

app.listen(PORT , ()=>{
    console.log(`app is listening on port --> ${PORT}`)
}); 

const userRoute = require("./src/routes/user-route");

app.use("/api/users" , userRoute);

