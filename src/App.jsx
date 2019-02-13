import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';
// import {randomstring} from 'randomstring';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1, //randomstring(),
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2, //randomstring(),
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  }
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
