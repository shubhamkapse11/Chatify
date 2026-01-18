const express = require("express");
const router = express.Router();
const secureMiddleware = require("../middlewares/secure-middleware");

const { registerUser , loginUser , logoutUser, getAllUsers } = require("../controllers/user-controller");

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/user",secureMiddleware ,getAllUsers)

module.exports = router;