// ChatMessage.jsx
// Renders a single chat message

import PropTypes from 'prop-types';

const ChatMessage = ({ message, isUser, isSystem }) => (
  <div className={`message ${isUser ? 'user-message' : isSystem ? 'system-message' : 'bot-message'}`}>
    <div className="message-content">
      <p>{message}</p>
    </div>
  </div>
);

// PropTypes for type checking and documentation
ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
  isSystem: PropTypes.bool,
};

ChatMessage.defaultProps = {
  isSystem: false,
};

export default ChatMessage; 