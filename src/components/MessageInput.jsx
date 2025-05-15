// MessageInput.jsx
// This component handles user message input and submission

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '54px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <div className="input-wrapper">
        <textarea
          ref={textAreaRef}
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
          placeholder="Say hi to Frobot..."
          className="message-textarea"
        />
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="send-button"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
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