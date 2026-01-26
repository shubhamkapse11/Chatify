const express = require("express");
const router = express.Router();
const {sendMessage , getMessages} = require("../controllers/message-controller");
const secureMiddleware = require("../middlewares/secure-middleware");

router.post("/message/send/:id" , secureMiddleware , sendMessage)
router.get("/message/get/:id" , secureMiddleware , getMessages)

module.exports = router
