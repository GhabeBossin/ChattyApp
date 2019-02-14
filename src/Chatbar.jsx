import React, {Component} from 'react';

// {this.props.currentUser}

class Chatbar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input name='userField' value={this.props.value} onKeyUp={this.props.handleNameSub} className='chatbarUsername' placeholder='Your Name (Optional)' />

        <input name='msgField' value={this.props.value} onKeyUp={this.props.handleMessageSub} type='text' className='chatbarMessage' placeholder='Type a message and hit ENTER' />
      </footer>
    )
  }
}

export default Chatbar;

{/* DON'T DELETE: defaultValue={this.props.currentUser.name} */}