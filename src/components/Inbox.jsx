import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./PageScreens.css";

const SOCKET_URL = "https://lendit-backend-production.up.railway.app";

const SAMPLE_CHATS = [
  { id: 1, name: "Rahul Sharma", lastMsg: "Is the bike still available?", time: "2m", unread: 2, avatar: "R", userId: "user1" },
  { id: 2, name: "Priya Singh", lastMsg: "Thanks for lending the camera!", time: "1h", unread: 0, avatar: "P", userId: "user2" },
  { id: 3, name: "Amit Kumar", lastMsg: "Can I pick it up tomorrow?", time: "3h", unread: 1, avatar: "A", userId: "user3" },
];

export default function Inbox({ user }) {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "them", text: "Hi! Is the item still available?", time: "10:30 AM" },
    { id: 2, from: "me", text: "Yes it is! When do you need it?", time: "10:32 AM" },
    { id: 3, from: "them", text: "Can I pick it up tomorrow morning?", time: "10:33 AM" },
  ]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    // Connect socket
    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit("join", user._id);

    // Receive message
    socketRef.current.on("receiveMessage", ({ senderId, message, time }) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        from: "them",
        text: message,
        time
      }]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) {
    return (
      <div className="page-screen">
        <div className="page-empty">
          <div className="page-empty-icon">💬</div>
          <h2 className="page-empty-title">Login to see messages</h2>
          <p className="page-empty-sub">Chat with lenders and borrowers here</p>
        </div>
      </div>
    );
  }

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMsg = {
      id: Date.now(),
      from: "me",
      text: message,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMsg]);

    // Send via socket
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: activeChat.userId,
        message
      });
    }

    setMessage("");
  };

  if (activeChat) {
    return (
      <div className="page-screen chat-screen">
        <div className="chat-header">
          <button className="back-btn" onClick={() => setActiveChat(null)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="chat-avatar">{activeChat.avatar}</div>
          <div>
            <div className="chat-name">{activeChat.name}</div>
            <div className="chat-status">Online</div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble chat-bubble--${msg.from}`}>
              <p>{msg.text}</p>
              <span className="bubble-time">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-bar">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="chat-send-btn" onClick={sendMessage}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-screen">
      <div className="page-header">
        <div>
          <h1 className="page-title">Inbox</h1>
          <p className="page-subtitle">Your conversations</p>
        </div>
      </div>

      <div className="chat-list">
        {SAMPLE_CHATS.map((chat) => (
          <div key={chat.id} className="chat-item" onClick={() => setActiveChat(chat)}>
            <div className="chat-item-avatar">{chat.avatar}</div>
            <div className="chat-item-body">
              <div className="chat-item-top">
                <span className="chat-item-name">{chat.name}</span>
                <span className="chat-item-time">{chat.time}</span>
              </div>
              <div className="chat-item-bottom">
                <span className="chat-item-msg">{chat.lastMsg}</span>
                {chat.unread > 0 && <span className="chat-unread">{chat.unread}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}