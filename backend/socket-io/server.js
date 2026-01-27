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

// Store online users: { userId: socketId }
const users = {};

// Helper function to get socket ID by user ID
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        users[userId] = socket.id;
        console.log("User registered:", { userId, socketId: socket.id });
        
        // Emit to all clients about online users
        io.emit("getOnlineUsers", Object.keys(users));
    }

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        
        // Remove user from online users
        if (userId) {
            delete users[userId];
            io.emit("getOnlineUsers", Object.keys(users));
        }
    });
});

module.exports = { io, app, server, getReceiverSocketId };