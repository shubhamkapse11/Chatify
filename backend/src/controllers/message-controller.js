const express = require("express");
const Message = require("../models/message-model");
const { isValidObjectId } = require("mongoose");
const Conversation = require("../models/conversation-model");
const { getReceiverSocketId, io } = require("../../socket-io/server");
const sendMessage = async (req , res) => {
    try{
        const {message} = req.body;
        const {id : receiver} = req.params;
        const sender = req.user._id;
        console.log("sender , receiver , message" , sender , receiver , message)
        if(!isValidObjectId(receiver)){
            return res.status(400).json({message : "Invalid user id"})
        }
        let conversation = await Conversation.findOne({
            participants : {$all : [sender , receiver]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants : [sender , receiver]
            })
        };
        const newMessage = await Message.create({
            sender,
            receiver,
            message
        })
        if(!newMessage){
            return res.status(400).json({message : "Failed to send message"})
        }
        conversation.messages.push(newMessage._id)
        await conversation.save()
        
        // Convert Mongoose document to plain object before emitting
        const messageObject = newMessage.toObject();
        
        const receiverSocketId = getReceiverSocketId(receiver);
        if(receiverSocketId){
            console.log("📤 Emitting newMessage to receiver:", receiver, "socketId:", receiverSocketId);
            io.to(receiverSocketId).emit("newMessage", messageObject);
        }
        res.status(200).json({newMessage}) 

    }catch(err){
        res.status(500).json({message : "Internal server error ==>" + err})
    }
}

const getMessages = async (req , res) => {
    try{
        const {id : receiver} = req.params;
        const sender = req.user._id;
        if(!isValidObjectId(receiver)){
            return res.status(400).json({message : "Invalid user id"})
        }
        let conversation = await Conversation.findOne({
            participants : {$all : [sender , receiver]}
        })
        if(!conversation){
            return res.status(200).json({messages: []})
        }
        const messages = await Message.find({
            _id : {$in : conversation.messages}
        })
        res.status(200).json({messages})
    }catch(err){
        res.status(500).json({message : "Internal server error ==>" + err})
    }
}


module.exports = {
    sendMessage,
    getMessages
}
