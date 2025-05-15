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
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm p-6 z-10">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Frobot
        </h1>
        <p className="text-center text-gray-600 mt-2">
          👋 Hi! I'm Frobot, your AI friend. I'm here to chat, support, and share some laughs with you.
        </p>
      </header>

      {/* Main chat container with padding for fixed header */}
      <main className="flex-1 container mx-auto max-w-4xl bg-white shadow-lg flex flex-col mt-32 mb-24 rounded-lg overflow-hidden">
        {/* Chat messages */}
        <ChatWindow messages={messages} />
      </main>

      {/* Fixed Message Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
