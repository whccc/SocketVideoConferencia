const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
app.use(cors());
const io = require("socket.io")(server);
const port = 3000;

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    const roomName = data.roomName;
    socket.join(roomName);
    socket.to(roomName).broadcast.emit("new-user", data);
    socket.on("disconnect", () => {
      socket.to(roomName).broadcast.emit("bye-user", data);
    });
    socket.on("Message", (Data) => {
      io.to(roomName).emit("Messaje", Data);
    });
  });
});

server.listen(process.env.PORT || port, () => {
  console.log(`Server running port ${port}`);
});
