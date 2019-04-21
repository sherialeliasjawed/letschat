import React, { Component } from 'react';
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM,
  createRoom
} from './methods';
import Dialog from './components/Dialog';
import RoomList from './components/RoomList';
import ChatSession from './components/ChatSession';
import MessageForm from './components/MessageForm';
import RoomUsers from './components/RoomUsers';
import CreateRoom from './components/CreateRoom';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      newRoom: '',
      roomName: null,
      messages: [],
      newMessage: ''
    };
    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.sendDM = sendDM.bind(this);
    this.createRoom = createRoom.bind(this);
  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentUser,
      currentRoom,
      roomUsers,
      newRoom,
      roomName,
      messages,
      newMessage
    } = this.state;
    return (
      <div className="App">
        <aside className="sidebar left-sidebar">
          {/*Checking if currentUser exists and if so rendering..*/}
          {currentUser ? (
            <div className="user-profile">
              <div className="avatar">
                <img src="/img/user.svg" alt="No avatar" />
              </div>
              <div className="username">{currentUser.name}</div>
              <div className="user-id">{`@${currentUser.id}`}</div>
            </div>
          ) : null}
          {/*Checking whether current room exists and if so lising all users in the current room */}
          {currentRoom ? (
            <RoomUsers
              currentUser={currentUser}
              roomUsers={roomUsers}
              sendDM={this.sendDM}
            />
          ) : null}
          {/*Checking whether user is logged in and if not show dialog to login..*/}
          {showLogin ? (
            <Dialog
              userId={userId}
              handleInput={this.handleInput}
              connectToChatkit={this.connectToChatkit}
            />
          ) : null}
        </aside>
        <section className="chat-screen">
          <header className="chat-header">
            {/*Checking if currentRoom exists and if so displaying room name in header, also listing amount of users in each room. */}
            {currentRoom ? (
              <h3>
                {roomName}{' '}
                <span style={{ color: '#0dabae' }}>
                  ({currentRoom.users.length} users)
                </span>
              </h3>
            ) : null}
          </header>
          <ul className="chat-messages">
            <ChatSession messages={messages} />
          </ul>
          <footer className="chat-footer">
            <MessageForm
              newMessage={newMessage}
              handleInput={this.handleInput}
              sendMessage={this.sendMessage}
            />
          </footer>
        </section>
        <aside className="sidebar right-sidebar">
          <h1>
            <span style={{ color: '#98a0a9' }}>lets</span>chat.
          </h1>
          {/*Checking whether current user exists and if so showing create room form */}
          <div className="right-sidebar-header">
            {currentUser ? (
              <CreateRoom
                newRoom={newRoom}
                createRoom={this.createRoom}
                handleInput={this.handleInput}
              />
            ) : null}
          </div>
          {/*Checking if currentRoom exists and if so rendering list of rooms*/}
          {currentRoom ? (
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              connectToRoom={this.connectToRoom}
              currentUser={currentUser}
            />
          ) : null}
        </aside>
      </div>
    );
  }
}

export default App;
