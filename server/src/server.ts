import app from "./app/app";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const server = createServer(app);
const port = 5000;

const io = new Server(server, { cors: { origin: "*" } });

export type User = {
  userName: string;
  socketID: string;
  id: string;
};

let users: Array<User> = [];

io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  //Updates the list of users when a user disconnects from the server
  users = users.filter((user) => user.socketID !== socket.id);
  console.log(users);
  //Sends the list of users to the client
  io.emit("newUserResponse", users);
  // socket.disconnect();
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
