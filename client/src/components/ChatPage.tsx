import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

type ChatPageProps = {
  socket: Socket;
};

export interface ChatMessages {
  name: string;
  text: string;
  id: string;
  socketID: string;
}

export interface MessageRef extends HTMLDivElement {
  scrollIntoView: (arg0: { [key: string]: string }) => void;
}

const ChatPage = ({ socket }: ChatPageProps) => {
  const [messages, setMessages] = useState<ChatMessages[]>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef<MessageRef>(null);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
