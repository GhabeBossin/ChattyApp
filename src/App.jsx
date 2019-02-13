/* eslint-disable no-console */
import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';
import randomstring from 'randomstring'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.handleMessageSub = this.handleMessageSub.bind(this)
    this.handleNameSub = this.handleNameSub.bind(this)
  }

  componentDidMount() {
    const socket = new WebSocket(
      'ws://localhost:3001'
      // in optional DOMString protocols
      );
      console.log('Connected to Server')

    // socket.addEventListener('open', function (event) {
    //   socket.send('Hello Server!');
    // });

    // console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)

    //   this.setState({messages: messages})
    // }, 3000);
  }

  handleNameSub(event) {
    console.log(event.target);
    const newCurrentUser = {name: event.target.value}
    this.setState({currentUser: newCurrentUser})

  }

  handleMessageSub(event) {
    if (event.key !== 'Enter') {
      return
    }
    const newMessage = {username: this.state.currentUser.name, content: event.target.value, id: randomstring.generate(9) }
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages});
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
