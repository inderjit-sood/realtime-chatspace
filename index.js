import express from "express";
import socket from "socket.io";

const PORT = 3000;
const app = express(); //express App

app.use(express.static("public"));

app.get("/tech", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const io = socket(server); //listens to events on Server? //Socket IO is an event based library. Communication using Events

//io->namespace->rooms
const tech = io.of("/tech");

tech.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    tech.in(data.room).emit("message", `A user has joined the ${data.room} room!`);
  });

  //when a socket receives a message, log it and emit it to the room
  socket.on("message", (data) => {
    console.log(`message: ${data.msg}`);
    tech.in(data.room).emit("message", data.msg);
  });

  /* socket.on("disconnect", () => {
    console.log("User Disconnect");
    tech.in(data.room).emit("message", "User Disconnect");
  }); */
});

/* fashion.on("connection", (socket) => {
  console.log("User Connected!");
  socket.on("message", (msg) => {
    console.log(`message: ${msg}`);
    fashion.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnect");
    fashion.emit("message", "User Disconnect");
  });
}); */
//socket is an instance of io i.e. io works on collection of sockets
