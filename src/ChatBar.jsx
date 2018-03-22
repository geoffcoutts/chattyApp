import React, { Component } from 'react';
import { ChromePicker } from 'react-color';


class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = { displayColorPicker: false,
                   color: this.props.currentUser.color
                  };
    this.onSubmit = this.onSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendMessage(evt) {
    const type = "postMessage";
    const username = this.props.currentUser.username;
    let content = evt.target.value;
    const color = this.props.currentUser.color;
    const newMessage = {type, username, content, color};

    this.props.addMessage(newMessage);
    evt.target.value = "";
  }

  updateUsername(evt) {
    const username = this.props.currentUser.username;
    const newUsername = evt.target.value;

    let content = `${username} has changed their name to ${newUsername}`;
    const type = "postNotification";
    const newMessage = { type, content, username: newUsername };
    this.props.addMessage(newMessage);
    this.props.changeUsername(newUsername);
  }

  onSubmit (evt) {
    if (evt.key === "Enter") {
      const isMessage = evt.target.name === 'message';
      const action = isMessage ? this.sendMessage : this.updateUsername;
      action(evt);
    }
  }

  handleClick () {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleChange (color) {
    this.setState({ color: color.hex });
    this.props.changeColor(color);
  }

  render () {
    console.log("Rendering Chatbar");

    return (
      <footer className="chatbar">
        <div
          className="chatbar-colorpick"
          style={{ backgroundColor: this.props.currentUser.color }}
          onClick={ this.handleClick }
        />
        { this.state.displayColorPicker ?
          <ChromePicker
            className="chrome-picker"
            color={ this.props.currentUser.color }
            disableAlpha = { true }
            onChange={ this.handleChange }
          />
        : null }
        <input
          className="chatbar-username"
          name="username"
          placeholder={ this.props.currentUser.username }
          onKeyPress={ this.onSubmit }
        />
        <input
          className="chatbar-message"
          type="text"
          name="message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={ this.onSubmit }
        />
      </footer>
    );
  }
}

export default ChatBar;
