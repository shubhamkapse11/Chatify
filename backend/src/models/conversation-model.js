const mongoose = require("mongoose");
const User = require('../models/user-model');
const Message = require('../models/message-model');

const conversationSchema = new mongoose.Schema({
 participants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
 }] ,
 messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : Message,
    default:[]
 }] 
} , 
{timestamps:true}
)

module.exports = mongoose.model("Conversation", conversationSchema);