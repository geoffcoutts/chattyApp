import React, {Component} from 'react';
import ColorPicker from './ColorPicker.jsx';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {childVisible: false};
    this.onSubmit = this.onSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.showColorPicker = this.showColorPicker.bind(this);
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
    const name = evt.target.value;
    // this.setState({currentUser: {name: {name}}});
    // console.log(this.state);

    let content = `${username} has changed their name to ${name}`;
    const type = "postNotification";
    const newMessage = {type, content, username: name};
    this.props.addMessage(newMessage);
    this.props.changeUsername({
      id: this.props.currentUser.id,
      username: name,
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

  showColorPicker (evt) {
    this.setState(prevState => ({ childVisible: !prevState.childVisible }));
  }

  render () {
    console.log("Rendering Chatbar");
    console.log(this.state);

    return (
      <footer className="chatbar">
        <div
          className="chatbar-colorpick"
          style={{backgroundColor: this.props.currentUser.color}}
          onClick={this.showColorPicker}>
          {this.state.childVisible
            ? <ColorPicker
                changeColor={this.props.changeColor}
                setColor={this.props.currentUser.color}
              />
            : null}
        </div>
        <input
          className="chatbar-username"
          name="user"
          placeholder={this.props.currentUser.username}
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
