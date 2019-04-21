import React from 'react';
import Proptypes from 'prop-types';

const MessageForm = props => {
  const { newMessage, handleInput, sendMessage } = props;

  return (
    <form onSubmit={sendMessage} className="message-form">
      <input
        value={newMessage}
        type="text"
        name="newMessage"
        className="message-input"
        placeholder="Type something here.."
        onChange={handleInput}
      />
    </form>
  );
};

MessageForm.propTypes = {
  newMessage: Proptypes.string.isRequired,
  handleInput: Proptypes.func.isRequired,
  sendMessage: Proptypes.func.isRequired
};

export default MessageForm;
