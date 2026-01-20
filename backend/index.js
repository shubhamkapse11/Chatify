require("dotenv").config();
const express  = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/db");
const secureMiddleware = require("./src/middlewares/secure-middleware");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

const PORT = process.env.PORT || 5005;

app.listen(PORT , ()=>{
    console.log(`app is listening on port --> ${PORT}`)
});

const userRoute = require("./src/routes/user-route");
const messageRoute = require("./src/routes/message-route");
app.use("/api/users" , userRoute);
app.use("/api/messages", messageRoute);

