import React, {Component} from 'react';

// {this.props.currentUser}

class Chatbar extends Component {
  // constructor(currentUser) {
  //   super({currentUser});

  // }
  render() {
    return (
      <footer className="chatbar">
        <input defaultValue={this.props.currentUser.name} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default Chatbar;