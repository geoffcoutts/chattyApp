import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {currentUser: {name :this.props.currentUser.name}};
    this.onSubmit = this.onSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  sendMessage(evt) {
    const username = this.state.currentUser.name;
    let content = evt.target.value;
    const type = "postMessage";
    const newMessage = {type, username, content};
    this.props.addMessage(newMessage);
    evt.target.value = "";
  }

  updateUsername(evt) {
    const username = this.state.currentUser.name;
    const name = evt.target.value;
    this.setState({currentUser: {name}});

    let content = `${username} has changed their name to ${name}`;
    const type = "postNotification";
    const newMessage = {type, content, username: name};
    this.props.addMessage(newMessage);
    this.props.changeUser(this.state.currentUser.name);
  }

  onSubmit (evt) {
    if (evt.key === "Enter") {
      const isMessage = evt.target.name === 'message';
      const action = isMessage ? this.sendMessage : this.updateUsername;
      action(evt);
    }
  }

  render () {
    console.log("Rendering Chatbar");

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="user"
          placeholder={this.state.currentUser.name}
          onKeyPress={this.onSubmit}
        />
        <input
          className="chatbar-message"
          type="text"
          name="message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.onSubmit}
        />
      </footer>
    );
  }
}

export default ChatBar;
