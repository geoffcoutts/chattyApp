import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {currentUser: {name :this.props.currentUser.name}};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    console.log(this.state.currentUser.name);
    const name = event.target.value;
    this.setState({currentUser: {name}});
    this.props.changeUser(this.state.currentUser);
  }

  render () {
    console.log("Rendering Chatbar");


    const onSubmit = evt => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        const username = this.state.currentUser.name;
        let content = evt.target.value;
        const type = "incomingMessage";
        const newMessage = {type, username, content};
        this.props.addMessage(newMessage);
        content = "";
      }
    };
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="user" placeholder={this.state.currentUser.name}  onKeyPress={this.handleChange}/>
        <input className="chatbar-message" type="text" name="input" placeholder="Type a message and hit ENTER" onKeyDown={onSubmit}/>
      </footer>
      );
  }
}

export default ChatBar;
