// import React from "react";
import Home from "./components/Home";
import Chat from "./components/ChatPage";
import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";

const socket = io("http://localhost:5000");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />}></Route>
      <Route path="/chat" element={<Chat socket={socket} />}></Route>
    </Routes>
  );
}

export default App;
