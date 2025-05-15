// App.jsx
// Main application component that integrates all chat components and manages state

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';

function App() {
  // State to store chat messages
  const [messages, setMessages] = useState([]);

  // Handler for sending new messages
  const handleSendMessage = (text) => {
    // Add user message to chat
    const userMessage = {
      text,
      isUser: true,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // In Phase 1, we'll just echo the message back
    // This will be replaced with AI responses in Phase 2
    const botMessage = {
      text: `[Echo] ${text}`,
      isUser: false,
    };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="py-6 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-3">
              Frobot
            </h1>
            <p className="text-gray-600">
              👋 Hi! I'm Frobot, your AI friend. I'm here to chat, support, and share some laughs with you.
            </p>
          </div>
        </div>
      </header>

      {/* Main chat container with padding for fixed header and footer */}
      <main className="flex-1 container mx-auto max-w-5xl px-4">
        <div className="bg-white shadow-lg rounded-lg mt-32 mb-40 overflow-hidden">
          <ChatWindow messages={messages} />
        </div>
      </main>

      {/* Fixed Message Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
        <div className="container mx-auto max-w-5xl px-4">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
