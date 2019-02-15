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
      messages   : [],
      clients    : undefined
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
      const parsedData = JSON.parse(event.data);

      let message = {
        id      : parsedData.id,
        type    : parsedData.type,
        username: parsedData.username,
        content : parsedData.content
      }
      console.log(client);
      let client = {
        number  : parsedData.number
      }
      console.log(client),
      this.setState({
        // currentUser: {name: parsedData.username}, why did I have this??
        messages: [...this.state.messages, message],
        clients : client.number
      })
    }
  }

  handleNameSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    let newCurrentUser = {name: event.target.value};
    let postNotification = {
      type    : 'postNotification',
      username: newCurrentUser.name,
      content : `User ${this.state.currentUser.name} has changed their name to ${newCurrentUser.name}`
    }
    this.socket.send(JSON.stringify(postNotification))
    console.log(this.state.currentUser.name, newCurrentUser)
    event.target.name === 'userField' ?
    this.setState({currentUser: newCurrentUser})
    : console.log('error: not userField');
  }

  handleMessageSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    const postMessage = {
      type    : 'postMessage',
      username: this.state.currentUser.name,
      content : event.target.value
    };
    this.socket.send(JSON.stringify(postMessage));
    event.target.value = '';
  }

  render() {
    console.log('after setstate:', this.state.clients)
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="onlineCount">{this.state.clients} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} handleNameSub={this.handleNameSub} handleMessageSub={this.handleMessageSub} />
      </div>
    );
  }
}

export default App;
