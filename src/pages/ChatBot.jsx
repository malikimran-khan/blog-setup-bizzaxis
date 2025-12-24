import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I’m BizAxis Assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
       
            //   const response = await fetch("http://localhost:5000/chat", {

      const response = await fetch(" https://bizzaxis-bot.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply || "Sorry, I didn’t understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex items-center gap-3">
          <BsRobot className="text-2xl" />
          <div>
            <h2 className="font-semibold text-lg">BizAxis Chatbot</h2>
            <p className="text-xs opacity-90">AI Powered Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <BsRobot className="text-indigo-600 text-xl mt-1" />
              )}

              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <FaUserCircle className="text-gray-500 text-xl mt-1" />
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <BsRobot className="animate-bounce" />
              Typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex items-center gap-2 bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
