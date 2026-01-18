const express = require("express");
const router = express.Router();

const { registerUser , loginUser , logoutUser, getAllUsers } = require("../controllers/user-controller");
router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/user" ,getAllUsers)
module.exports = router;