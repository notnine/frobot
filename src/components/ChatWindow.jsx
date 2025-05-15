// ChatWindow.jsx
// This component manages the chat window and displays a list of messages

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages }) => {
  // Reference to the chat container for auto-scrolling
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 p-4 overflow-y-auto custom-scrollbar"
    >
      {/* Display welcome message if no messages exist */}
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>👋 Welcome to Virtual Friend Chat!</p>
          <p className="mt-2">Send a message to start the conversation.</p>
        </div>
      ) : (
        // Map through messages and render each one
        messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.text}
            isUser={msg.isUser}
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
    })
  ).isRequired,
};

export default ChatWindow; 