const  http = require("http");
const express = require("express")
const {Server} = require("socket.io")

const app  = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
    console.log("a user connected", socket.id)
    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
    })
})

module.exports = {io,app,server}