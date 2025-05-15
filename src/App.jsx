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
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Virtual Friend Chat
        </h1>
      </header>

      {/* Main chat container */}
      <main className="flex-1 container mx-auto max-w-3xl bg-white shadow-lg flex flex-col my-4 rounded-lg overflow-hidden">
        {/* Chat messages */}
        <ChatWindow messages={messages} />
        
        {/* Message input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}

export default App;
