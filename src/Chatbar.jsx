import React, {Component} from 'react';

// {this.props.currentUser}

class Chatbar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input value={this.props.value} onBlur={this.props.handleNameSub} defaultValue={this.props.currentUser.name} className='chatbarUsername' placeholder='Your Name (Optional)' />

        <input value={this.props.value} onKeyUp={this.props.handleMessageSub} type='text' className='chatbarMessage' placeholder='Type a message and hit ENTER' />
      </footer>
    )
  }
}

export default Chatbar;