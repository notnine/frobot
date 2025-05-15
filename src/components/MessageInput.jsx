// MessageInput.jsx
// Handles user message input with auto-resizing textarea

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ onSendMessage, isLoading, isDisabled }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '54px';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !isDisabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !isDisabled) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <div className="input-wrapper">
        <textarea
          ref={textAreaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isDisabled ? "Message limit reached. Please wait..." : "Say hi to Frobot..."}
          className="message-textarea"
          disabled={isLoading || isDisabled}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || isLoading || isDisabled}
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

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

MessageInput.defaultProps = {
  isLoading: false,
  isDisabled: false,
};

export default MessageInput; 