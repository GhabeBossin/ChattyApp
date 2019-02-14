/* eslint-disable no-console */

// App
import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // optional. if currentUser is not defined, use Anonymous or maybe sillyname?
      currentUser: {name: 'Anonymous'},
      messages   : []
    }
    this.handleMessageSub = this.handleMessageSub.bind(this)
    this.handleNameSub    = this.handleNameSub.bind(this)
  ;}

  componentDidMount() {
    this.socket = new WebSocket(
      'ws://localhost:3001'
    );
    console.log('Yeah baby yeaaaah!');
    this.socket.onmessage = (event) => {
      const returnedMsg = JSON.parse(event.data);
      let message = {
        id      : returnedMsg.id,
        type    : returnedMsg.type,
        username: returnedMsg.username,
        content : returnedMsg.content
      }
      this.setState({
        currentUser: {name: returnedMsg.username},
        messages   : [...this.state.messages, message]
      })
    }
  }

  handleNameSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    let newCurrentUser = {name: event.target.value}
    event.target.name === 'userField' ?
    this.setState({currentUser: newCurrentUser})
    : console.log('error: not userField');
    const notificationToServer = {
      type       : 'notification',
      newUsername: newCurrentUser,
      content    : event.target.value
    }

  }

  handleMessageSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    const msgToServer = {
      username: this.state.currentUser.name,
      content : event.target.value
    };
    this.socket.send(JSON.stringify(msgToServer));
    event.target.value = '';
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} handleNameSub={this.handleNameSub} handleMessageSub={this.handleMessageSub} />
      </div>
    );
  }
}

export default App;
