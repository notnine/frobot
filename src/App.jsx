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
    setMessages([
      ...messages, 
      { text, isUser: true },
      { text: `Frobot: ${text}`, isUser: false }
    ]);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Frobot</h1>
        <p>👋 Hi! I'm Frobot, your AI friend. I'm here to chat, support, and share some laughs with you.</p>
      </header>

      {/* Main chat container */}
      <main className="chat-container">
        <ChatWindow messages={messages} />
      </main>

      {/* Message Input at Bottom */}
      <div className="input-container">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
