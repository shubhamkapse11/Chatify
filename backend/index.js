const express  = require("express");
const cors = require("cors");
const connectDB = require("./src/db");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

const PORT = process.env.PORT || 5005;

app.listen(PORT , ()=>{
    console.log(`app is listening on port --> ${PORT}`)
}); 

const userRoute = require("./src/routes/user-route");

app.use("/api/users" , userRoute);

