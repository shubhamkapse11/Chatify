const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});


// Real time message
module.exports.getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};






// Store online users: { userId: socketId }
const users = {};

// Helper function to get socket ID by user ID
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

io.on("connection", (socket) => {
    console.log("🔌 New connection attempt - Socket ID:", socket.id);
    
    const userId = socket.handshake.query.userId;
    console.log("📋 Received userId from query:", userId);
    
    if (userId && userId !== "undefined") {
        users[userId] = socket.id;
        console.log("✅ User registered:", { userId, socketId: socket.id });
        console.log("👥 Total online users:", Object.keys(users).length);
        console.log("📊 All users:", users);
        
        // Emit to all clients about online users
        io.emit("getOnlineUsers", Object.keys(users));

    } else {
        console.log("❌ Invalid userId - not registering user");
    }

    socket.on("disconnect", () => {
        console.log("🔴 User disconnecting - Socket ID:", socket.id);
        
        // Remove user from online users
        if (userId && userId !== "undefined") {
            delete users[userId];
            console.log("🗑️ User removed:", userId);
            console.log("👥 Remaining online users:", Object.keys(users).length);
            io.emit("getOnlineUsers", Object.keys(users));
        }
    });
});

module.exports = { io, app, server, getReceiverSocketId };