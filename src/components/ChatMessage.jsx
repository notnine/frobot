// ChatMessage.jsx
// This component renders a single chat message

import PropTypes from 'prop-types';

const ChatMessage = ({ message, isUser }) => (
  <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
    <div className="message-content">
      <p>{message}</p>
    </div>
  </div>
);

// PropTypes for type checking and documentation
ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default ChatMessage; 