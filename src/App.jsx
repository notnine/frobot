// App.jsx
// Main application component that integrates all chat components and manages state

import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { RateLimiter } from './utils/rateLimit';
import './App.css';

// Rate limiting configuration
const MAX_TOKENS_PER_HOUR = 8000;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState('supportive');
  const [rateLimitInfo, setRateLimitInfo] = useState({
    tokensRemaining: MAX_TOKENS_PER_HOUR,
    percentUsed: 0,
    isLimited: false
  });

  // Update rate limit info on component mount and after each message
  useEffect(() => {
    const updateRateLimitInfo = () => {
      const stats = RateLimiter.getStats();
      setRateLimitInfo({
        tokensRemaining: stats.tokensRemaining,
        percentUsed: stats.percentUsed,
        isLimited: stats.isLimited
      });
    };
    
    updateRateLimitInfo();
    const intervalId = setInterval(updateRateLimitInfo, 60000);
    return () => clearInterval(intervalId);
  }, [messages]);

  // Handler for sending new messages
  const handleSendMessage = async (text) => {
    // Check rate limiting
    if (RateLimiter.isLimited()) {
      const stats = RateLimiter.getStats();
      addMessage(text, true);
      addMessage(`Sorry, you've reached the hourly token limit. Please try again in about ${stats.minutesUntilReset} ${stats.minutesUntilReset === 1 ? 'minute' : 'minutes'}.`, false, true);
      return;
    }
    
    // Check if message would exceed limit
    if (RateLimiter.wouldExceedLimit(text)) {
      addMessage(text, true);
      addMessage('This message is too long and would exceed your hourly token limit. Please try a shorter message or wait until your limit resets.', false, true);
      return;
    }
    
    // Add user message
    addMessage(text, true);
    setIsLoading(true);
    
    try {
      // Call API
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, personality }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API error: ${response.status} ${errorText || 'Unknown error'}`);
      }
      
      const data = await response.json();
      
      // Update rate limiting
      RateLimiter.incrementWithTokens(text, data.message);
      
      // Add bot response
      addMessage(data.message, false);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Sorry, I\'m having trouble connecting right now. Please try again later.';
      
      if (error.message.includes('API key')) {
        errorMessage = 'Sorry, there seems to be an issue with my API key. Please check your configuration.';
      } else if (error.message.includes('OpenAI')) {
        errorMessage = `Sorry, there was an error communicating with OpenAI: ${error.message}`;
      }
      
      addMessage(errorMessage, false);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to add messages to state
  const addMessage = (text, isUser, isSystem = false) => {
    setMessages(prev => [...prev, { text, isUser, isSystem }]);
  };

  // Handler for changing personality
  const handlePersonalityChange = (e) => {
    const newPersonality = e.target.value;
    setPersonality(newPersonality);
    addMessage(`Frobot is now in ${newPersonality} mode!`, false, true);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Frobot</h1>
        <p>👋 Hi! I'm Frobot, your AI friend. I'm here to chat, support, and share some laughs with you.</p>
        
        {/* Personality Selector */}
        <div className="personality-selector">
          <label htmlFor="personality">Choose my personality: </label>
          <select 
            id="personality" 
            value={personality} 
            onChange={handlePersonalityChange}
            disabled={isLoading || rateLimitInfo.isLimited}
          >
            <option value="supportive">Supportive</option>
            <option value="funny">Funny</option>
            <option value="honest">Honest</option>
          </select>
        </div>
        
        {/* Rate Limit Info */}
        <div className="rate-limit-info">
          <p>Tokens: {rateLimitInfo.tokensRemaining}/{MAX_TOKENS_PER_HOUR} remaining</p>
          <div className="usage-bar">
            <div 
              className={`usage-fill ${rateLimitInfo.percentUsed > 75 ? 'warning' : ''} ${rateLimitInfo.percentUsed > 90 ? 'danger' : ''}`}
              style={{width: `${rateLimitInfo.percentUsed}%`}}
            ></div>
          </div>
        </div>
      </header>

      {/* Main chat container */}
      <main className="chat-container">
        <ChatWindow messages={messages} />
        {isLoading && <div className="loading-indicator"><p>Frobot is thinking...</p></div>}
      </main>

      {/* Message Input */}
      <div className="input-container">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          isDisabled={rateLimitInfo.isLimited || isLoading}
        />
      </div>
    </div>
  );
}

export default App;
