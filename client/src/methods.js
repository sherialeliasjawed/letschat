import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value
  });
}

function createRoom(event) {
  event.preventDefault();
  const { currentUser, newRoom } = this.state;
  if (newRoom.length > 0 && newRoom.trim() !== '') {
    currentUser
      .createRoom({
        name: newRoom,
        private: false,
        customData: {
          isDirectMessage: false,
          userIds: [currentUser.id]
        }
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });

    this.setState({
      newRoom: ''
    });
  }
}

function createPrivateRoom(id) {
  const { currentUser, rooms } = this.state;
  const roomName = `${currentUser.id}_${id}`;

  const isPrivateChatCreated = rooms.filter(room => {
    if (room.customData && room.customData.isDirectMessage) {
      const arr = [currentUser.id, id];
      const { userIds } = room.customData;

      if (arr.sort().join('') === userIds.sort().join('')) {
        return {
          room
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: `${roomName}`,
    private: true,
    addUserIds: [`${id}`],
    customData: {
      isDirectMessage: true,
      userIds: [currentUser.id, id]
    }
  });
}

function sendDM(id) {
  createPrivateRoom.call(this, id).then(room => {
    connectToRoom.call(this, room.id);
  });
}

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  // Don't want to pollute the chatroom with empty messages.
  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`
  });

  // Empty newMessage in state so that input field gets cleared.
  this.setState({
    newMessage: ''
  });
}

function connectToRoom(id = '20648717') {
  const { currentUser } = this.state;

  this.setState({
    messages: []
  });

  return currentUser
    .subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        // Invoked when there is a new message.
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        },
        // Invoked when a user logs in or out.
        onPresenceChanged: () => {
          const { currentRoom } = this.state;
          this.setState({
            roomUsers: currentRoom.users.sort(a => {
              if (a.presence.state === 'online') return -1;

              return 1;
            })
          });
        }
      }
    })
    .then(currentRoom => {
      // Private/direct messages are supported, so checking whether the direct message flag is true
      // if true the room name is set to the username of the person that's being messaged.
      const roomName =
        currentRoom.customData && currentRoom.customData.isDirectMessage
          ? currentRoom.customData.userIds.filter(
              id => id !== currentUser.id
            )[0]
          : currentRoom.name;

      this.setState({
        currentRoom,
        roomUsers: currentRoom.users,
        rooms: currentUser.rooms,
        roomName
      });
    })
    .catch(console.error);
}

function connectToChatkit(event) {
  event.preventDefault();

  const { userId } = this.state;

  // Making sure no empty userId is entered.
  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
    return;
  }

  axios
    .post('/users', { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: '/authenticate'
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:15a4e1ad-85e5-4f75-8403-1ca55ac4eebe',
        userId,
        tokenProvider
      });

      return (
        chatManager
          .connect({
            //Invoked when added to a room.
            onAddedToRoom: room => {
              const { rooms } = this.state;
              this.setState({
                rooms: [...rooms, room]
              });
            }
          })
          // ChatManager returns the currentUser object for use.
          .then(currentUser => {
            this.setState(
              {
                currentUser,
                showLogin: false,
                rooms: currentUser.rooms
              },
              () => connectToRoom.call(this)
            );
          })
      );
    })
    .catch(console.error);
}

export {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM,
  createRoom
};
