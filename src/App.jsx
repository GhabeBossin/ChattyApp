/* eslint-disable no-console */
import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // optional. if currentUser is not defined, use Anonymous
      currentUser: {name: 'Anonymous'},
      messages: [
        // {
        //   id: 1,
        //   type: 'incomingMessage',
        //   username: 'Bob',
        //   content: 'Has anyone seen my marbles?',
        // },
        // { //rebuild this yeah
        //   id: 2,
        //   type: 'incomingMessage',
        //   username: 'Anonymous',
        //   content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        // },
        // {
        //   id: 3,
        //   type: 'incomingNotification',
        //   username: 'Anonymous',
        //   content: 'A notification example'
        // }
      ]
    }
    this.handleMessageSub = this.handleMessageSub.bind(this)
    this.handleNameSub = this.handleNameSub.bind(this)
    // this.socket = this.socket.bind(this)
  ;}

  componentDidMount() {
    this.socket = new WebSocket(
      'ws://localhost:3001'
    );
    // console.log('Connected to Server')
    this.socket.onmessage = (event) => {
      // this.socket.send('Hello Server!');
      const returnedMsg  = JSON.parse(event.data);
      console.log(returnedMsg);
      const returnedUser = returnedMsg.username;
      console.log(returnedUser);
      const returnedId   = returnedMsg.id;
      const returnedType = returnedMsg.type;
      const returnedContent = returnedMsg.content
      let message = {
        id      : returnedId,
        type    : returnedType,
        username:returnedUser,
        content :returnedContent
      }
      this.setState({
        currentUser: returnedUser,
        messages: [...this.state.messages, message] // <- this creates a shallow copy of the existing messages and appends the newest // I want to reference this, leave it. <3
      }, () => { console.log(this.state.currentUser); })
    }
  }

  handleNameSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    let newCurrentUser = {name: event.target.value}
    console.log(event.target.value)
    event.target.name === 'userField' ?
    this.setState({currentUser: newCurrentUser}) 
    : console.log('nope');
  }

  handleMessageSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    const newMsgToServer = {
      username: this.state.currentUser.name,
      content : event.target.value
    };
    this.socket.send(JSON.stringify(newMsgToServer));
    event.target.value = '';
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} handleNameSub={this.handleNameSub} handleMessageSub={this.handleMessageSub}/>
      </div>
    );
  }
}

export default App;

// OLD DISPLAY MESSAGE CODE {

  // import { IncomingMessage } from 'http';

  // const newMessage = {username: this.state.currentUser.name, content: event.target.value, id: randomstring.generate(9), type: 'incomingMessage' }
  // const messages = this.state.messages.concat(newMessage)
  // this.setState({messages: messages});

// }
