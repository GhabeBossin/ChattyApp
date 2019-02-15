/* eslint-disable no-console */

// App
import React, { Component } from 'react'
import MessageList from './MessageList.jsx'
import Chatbar from './Chatbar.jsx'
import sillyname from 'sillyname'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //generates sillyname by default until user sets their own
      currentUser: {name: sillyname()},
      messages   : [],
      clients    : undefined
    }
    this.handleMessageSub = this.handleMessageSub.bind(this)
    this.handleNameSub    = this.handleNameSub.bind(this)
    this.checkForAlphaNum = this.checkForAlphaNum.bind(this)
  }

  componentDidMount() {
    this.socket = new WebSocket(
      'ws://localhost:3001'
    )
    console.log('Yeah baby yeaaaah!')

    this.socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data)

      if (parsedData.type === 'incomingClientCount') {
        let client = {number: parsedData.number}
        this.setState({
          clients: client.number
        })
      }

      let message = {
        id      : parsedData.id,
        type    : parsedData.type,
        username: parsedData.username,
        content : parsedData.content
      }
      this.setState({messages: [...this.state.messages, message]})
    }
  }

  checkForAlphaNum (value) {
    for(let char of value){
      if(char !== ' ') {
        return false
      }
    }
    return true
  }

  handleNameSub(event) {
    if (event.key !== 'Enter' && event.key !== 'Tab') {
      return
    } else if (event.target.value.length < 1) {
      return
    } else if (this.checkForAlphaNum(event.target.value)) {
      return
    }

    let newCurrentUserName   = {name: event.target.value}
    let postNotification = {
      type    : 'postNotification',
      username: newCurrentUserName.name,
      content : `User ${this.state.currentUser.name} has changed their name to ${newCurrentUserName.name}`
    }
    this.socket.send(JSON.stringify(postNotification))

    if (event.target.name === 'userField') {
      this.setState({currentUser: newCurrentUserName})
    }
  }

  handleMessageSub(event) {
    if (event.key !== 'Enter') {
      return
    } else if (event.target.value.length < 1) {
      return
    } else if (this.checkForAlphaNum(event.target.value)) {
      return
    }

    const postMessage = {
      type    : 'postMessage',
      username: this.state.currentUser.name,
      content : event.target.value
    }
    this.socket.send(JSON.stringify(postMessage))

    event.target.value = ''
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-online">{this.state.clients} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} handleNameSub={this.handleNameSub} handleMessageSub={this.handleMessageSub} />
      </div>
    )
  }
}

export default App
