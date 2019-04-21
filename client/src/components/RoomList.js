import React from 'react';
import Proptypes from 'prop-types';

const RoomList = props => {
  const { rooms, currentRoom, connectToRoom, currentUser } = props;
  const roomList = rooms.map(room => {
    // Changing room icon depending on whether it's a public room or a private direct message. Images in public/img
    const roomIcon = !room.isPrivate ? (
      <img src="/img/square-shape-shadow.svg" alt="Public" class="public-img" />
    ) : (
      <img
        src="/img/lock-closed-padlock-silhouette.svg"
        alt="Private"
        class="private-img"
      />
    );
    const isRoomActive = room.id === currentRoom.id ? 'active' : '';

    return (
      <li
        className={isRoomActive}
        key={room.id}
        onClick={() => connectToRoom(room.id)}
      >
        <span className="room-icon">{roomIcon}</span>
        {room.customData && room.customData.isDirectMessage ? (
          <span className="room-name">
            {room.customData.userIds.filter(id => id !== currentUser.id)[0]}
          </span>
        ) : (
          <span className="room-name">{room.name}</span>
        )}
      </li>
    );
  });
  return (
    <div className="rooms">
      <ul className="chat-rooms">{roomList}</ul>
    </div>
  );
};

RoomList.propTypes = {
  rooms: Proptypes.array.isRequired,
  currentRoom: Proptypes.object.isRequired,
  connectToRoom: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired
};

export default RoomList;
