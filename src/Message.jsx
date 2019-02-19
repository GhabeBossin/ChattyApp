import React, { Component } from 'react'

// message for message list
class Message extends Component {
  render() {
    return (
        this.props.type === 'incomingMessage' ?
        (<div className="message">
          <span className="message-username">{this.props.username + ':'}</span>
          <span className="message-content">{this.props.content}</span>
        </div>)
        : this.props.type === 'incomingNotification' ?
        (<div className="message system">{this.props.content}
        </div>)
        : null
    )
  }
}

export default Message