const express = require("express");
const app = express();
const server = app.listen(process.env.PORT || 5000);

app.use(express.static("public"));

const io = require("socket.io")(server);

io.sockets.on("connection", (socket) => {
  socket.on("mouse", (data) => {
    socket.broadcast.emit("mouse", data);
  });

  socket.on("disconnect", () => {
    console.log("Client has disconnected");
  });
});
