/* eslint-disable react/prop-types */
import React, {Component} from 'react'

class Chatbar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input defaultValue={this.props.currentUser.name} name='userField' value={this.props.value} onKeyDown={this.props.handleNameSub} className='username-input' placeholder='Set name (Optional), hit ENTER' />

        <input name='msgField' value={this.props.value} onKeyUp={this.props.handleMessageSub} type='text' className='message-input' placeholder='Type a message and hit ENTER' />
      </footer>
    )
  }
}

export default Chatbar

{/* DON'T DELETE: defaultValue={this.props.currentUser.name} */}