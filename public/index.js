function getPath(locationName) {
  const path = require("path");
  return path.join(__dirname, locationName);
}
// Servidor
const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3000);
const port = app.get("port");

// Rutas servidor
app.use(express.static(getPath("public")));

// Iniciar servidor
const server = app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

// Websockets
const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("chatMessage", (data) => {
    io.sockets.emit("chatMessage", data);
  });

  socket.on("chatTyping", (data) => {
    console.log("servidor recibe" + data);
    socket.broadcast.emit("chatTyping", data);
  });
});
