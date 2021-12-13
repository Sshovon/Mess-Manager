const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Mess= require('../models/messModel');
app.use(cors());

const run = async () => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection",(socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room",(data) => {
      console.log(`joined room :${socket.id}`);
      socket.join(data);
      
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", async(data) => {
      console.log(data)
      const {author,message,time,room}=data
      const mess=await Mess.findOne({_id:room})
      mess.messages=mess.messages.concat({
        message,
        time,
        author
      })
      mess.save();

      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  server.listen(process.env.PORT2, () => {
    console.log("SERVER RUNNING on port 3001");
  });
};  


module.exports = run;
