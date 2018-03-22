import React, {Component} from 'react';
import ColorPicker from './ColorPicker.jsx';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    // this.state = {currentUser: this.props.currentUser};
    this.onSubmit = this.onSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  sendMessage(evt) {
    const username = this.props.currentUser.name;
    let content = evt.target.value;
    const type = "postMessage";
    const newMessage = {type, username, content};
    this.props.addMessage(newMessage);
    evt.target.value = "";
  }

  updateUsername(evt) {
    const username = this.props.currentUser.username;
    const name = evt.target.value;
    // this.setState({currentUser: {name: {name}}});
    // console.log(this.state);

    let content = `${username} has changed their name to ${name}`;
    const type = "postNotification";
    const newMessage = {type, content, username: name};
    this.props.addMessage(newMessage);
    this.props.changeUsername({
      id: this.props.currentUser.id,
      name,
      color: this.props.currentUser.color
    });
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
    console.log(this.props.currentUser);

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="user"
          placeholder={this.props.currentUser.username}
          onKeyPress={this.onSubmit}
        />
        <div className="chatbar-colorpick" style={{backgroundColor: this.props.currentUser.color}}></div>
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
