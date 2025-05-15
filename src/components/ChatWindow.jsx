// ChatWindow.jsx
// Displays the chat messages and handles auto-scrolling

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages }) => {
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={chatContainerRef} className="chat-window">
      {/* Display welcome message if no messages exist */}
      {messages.length === 0 ? (
        <div className="welcome-message">
          <p>Send a message to start the conversation.</p>
        </div>
      ) : (
        // Map through messages and render each one
        messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            isSystem={msg.isSystem}
          />
        ))
      )}
    </div>
  );
};

// PropTypes for type checking and documentation
ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      isUser: PropTypes.bool.isRequired,
      isSystem: PropTypes.bool,
    })
  ).isRequired,
};

export default ChatWindow; 