// MessageInput.jsx
// This component handles user message input and submission

import { useState } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200 bg-white">
      <div className="flex gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (message.trim()) {
                onSendMessage(message);
                setMessage('');
              }
            }
          }}
          placeholder="Type your message... (Press Enter to send, Shift + Enter for new line)"
          className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none h-16"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          Send
        </button>
      </div>
    </form>
  );
};

// PropTypes for type checking and documentation
MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput; 