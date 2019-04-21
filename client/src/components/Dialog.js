import React from 'react';
import Proptypes from 'prop-types';

// Log in dialog
const Dialog = props => {
  const { userId, handleInput, connectToChatkit } = props;

  return (
    <div className="dialog-container">
      <div className="dialog">
        <form className="dialog-form" onSubmit={connectToChatkit}>
          <label className="username-label" htmlFor="username">
            Please enter your username and password: <br />
            (Please provide just a username for now.)
          </label>
          <input
            id="username"
            className="username-input"
            autoFocus
            type="text"
            name="userId"
            value={userId}
            onChange={handleInput}
            placeholder="Username"
          />
          <input
            type="password"
            className="password-input"
            placeholder="Password (Coming soon..)"
            disabled
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  userId: Proptypes.string.isRequired,
  handleInput: Proptypes.func.isRequired,
  connectToChatkit: Proptypes.func.isRequired
};

export default Dialog;
