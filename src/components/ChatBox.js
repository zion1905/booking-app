import React, { useState, useEffect, useRef } from "react";

const ChatBox = ({ userName, otherName }) => {
  const [messages, setMessages] = useState([
    { sender: otherName, text: `Welcome to ${otherName}'s Mahal! How can I assist you?` },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: userName, text: input.trim() }]);
    setInput("");
    
    // Simulate owner auto reply after 1.5s for demo
    if (userName !== otherName) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: otherName, text: "Thank you for your message. We will get back to you soon!" },
        ]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>{`Chat with ${otherName}`}</div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === userName ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === userName ? "#4a90e2" : "#e1e1e1",
              color: msg.sender === userName ? "white" : "black",
            }}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    maxWidth: 420,
    margin: "20px auto",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    borderBottom: "1px solid #ccc",
    paddingBottom: 8,
  },
  messagesContainer: {
    flexGrow: 1,
    minHeight: 150,
    maxHeight: 250,
    overflowY: "auto",
    marginBottom: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  message: {
    padding: 10,
    borderRadius: 14,
    maxWidth: "75%",
  },
  inputContainer: {
    display: "flex",
    gap: 8,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 14,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  sendButton: {
    padding: "10px 18px",
    borderRadius: 14,
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ChatBox;
