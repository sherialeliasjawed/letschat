import React from 'react';
import Proptypes from 'prop-types';

const RoomUsers = props => {
  const { roomUsers, currentUser, sendDM } = props;

  const users = roomUsers.map(user => {
    return (
      <li className="room-member" key={user.id}>
        <div>
          {/* Showing whether a user is online or offline*/}
          <span className={`presence ${user.presence.state}`} />
          <span>{user.name}</span>
        </div>
        {/* Direct message: Making sure the option only shows up for users that aren't the current user */}
        {currentUser.id !== user.id ? (
          <button
            onClick={() => sendDM(user.id)}
            title={`Sent ${user.name} a direct message`}
            className="send-dm"
          >
            +
          </button>
        ) : null}
      </li>
    );
  });

  return (
    <div className="room-users">
      <span className="room-users">Users in this room:</span>
      <ul>{users}</ul>
    </div>
  );
};

RoomUsers.propTypes = {
  roomUsers: Proptypes.array.isRequired,
  sendDM: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired
};

export default RoomUsers;
