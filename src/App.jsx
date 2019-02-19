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
    // bind all methods
    this.handleMessageSub = this.handleMessageSub.bind(this)
    this.handleNameSub    = this.handleNameSub.bind(this)
    this.checkForAlphaNum = this.checkForAlphaNum.bind(this)
  }

  componentDidMount() {
    //new websocket instance
    this.socket = new WebSocket('ws://localhost:3001')

    //on recieving message from server, seperate and assign data, then set state respectively
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

  //helper method for input validation
  checkForAlphaNum (value) {
    for(let char of value){
      if(char !== ' ') {
        return false
      }
    }
    return true
  }

  handleNameSub(event) {
    //validate
    if (event.key !== 'Enter' && event.key !== 'Tab') {
      return
    } else if (event.target.value.length < 1) {
      return
    } else if (this.checkForAlphaNum(event.target.value)) {
      return
    }

    //set visible username
    let newCurrentUserName   = {name: event.target.value}
    //create object data to send to server
    let postNotification = {
      type    : 'postNotification',
      username: newCurrentUserName.name,
      content : `User ${this.state.currentUser.name} has changed their name to ${newCurrentUserName.name}`
    }
    //send to server
    this.socket.send(JSON.stringify(postNotification))
    //specify which input
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

    //clear message field after sending to server
    event.target.value = ''
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>

          <span className="navbar-online">{this.state.clients} users online</span>
        </nav>
        {/* creates custom MessageList element and passes desired props */}
        <MessageList messages={this.state.messages} />

        {/* creates custom Chatbar Component and passes desired props */}
        <Chatbar currentUser={this.state.currentUser} handleNameSub={this.handleNameSub} handleMessageSub={this.handleMessageSub} />
      </div>
    )
  }
}

export default App
