import app from "./app/app";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const server = createServer(app);
const port = 5000;

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
