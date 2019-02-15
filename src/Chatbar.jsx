import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input name='userField' value={this.props.value} onKeyUp={this.props.handleNameSub} className='chatbarUsername' placeholder='Set name (Optional), hit ENTER' />

        <input name='msgField' value={this.props.value} onKeyUp={this.props.handleMessageSub} type='text' className='chatbarMessage' placeholder='Type a message and hit ENTER' />
      </footer>
    )
  }
}


// TODO: user cannot change their name to nothing
export default Chatbar;

{/* DON'T DELETE: defaultValue={this.props.currentUser.name} */}