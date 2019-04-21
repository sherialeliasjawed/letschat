import React from 'react';
import Proptypes from 'prop-types';

const CreateRoom = props => {
  const { newRoom, createRoom, handleInput } = props;

  return (
    <div className="create-room">
      <form className="create-room-form" onSubmit={createRoom}>
        <input
          name="newRoom"
          type="text"
          value={newRoom}
          onChange={handleInput}
          placeholder="Create new room"
          className="create-room-input"
        />
        <button type="submit" className="create-room-btn">
          +
        </button>
      </form>
    </div>
  );
};

CreateRoom.propTypes = {
  newRoom: Proptypes.string.isRequired,
  createRoom: Proptypes.func.isRequired
};

export default CreateRoom;
