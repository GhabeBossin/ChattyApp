import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="messages">
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        <div className="message system">
          {/* Anonymous1 changed their name to nomnom. */}
        </div>
      </div>
    )
  }
}

export default Message;
export {Message};