import React from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {
  return <div>CHAT APP</div>;
}

export default App;
