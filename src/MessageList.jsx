import React, { Component } from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    const messageOrNotify = this.props.messages.map(message => (
      <Message key={message.id} username={message.username} content={message.content} type={message.type} />
    ))

    return(
      <main className="messages">
        {messageOrNotify}
      </main>
    )
  }
}

// export default MessageList;

// EXAMPLE OF MESSAGE DATA FROM WSS
// state.messages = [
//   {
//     type: "incomingMessage",
//     content: "I won't be impressed with technology until I can download food.",
//     username: "Anonymous1"
//   },
//   {
//     type: "incomingNotification",
//     content: "Anonymous1 changed their name to nomnom",
//   },
//   {
//     type: "incomingMessage",
//     content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
//     username: "Anonymous2"
//   },
// ]
