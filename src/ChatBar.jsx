import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {currentUser: {name :this.props.currentUser.name}};
    this.onSubmit = this.onSubmit.bind(this);
  }



  onSubmit (evt) {
      if (evt.key === "Enter") {
      const username = this.state.currentUser.name;
      const action = (evt.target.name === "input") ? (
          ()=>{
            evt.preventDefault();
            let content = evt.target.value;
            const type = "postMessage";
            const newMessage = {type, username, content};
            this.props.addMessage(newMessage);
            evt.target.value = "";
          }
        ) : (
          () =>{
            const name = evt.target.value;
            this.setState({currentUser: {name}});

            let content = `${username} has changed their name to ${name}`;
            const type = "postNotification";
            const newMessage = {type, content, username: name};
            console.log(newMessage);
            this.props.addMessage(newMessage);

            this.props.changeUser(this.state.currentUser.name);
          }
        );
      action(evt);
      }
  }

  render () {
    console.log("Rendering Chatbar");


    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="user" placeholder={this.state.currentUser.name}  onKeyPress={this.onSubmit}/>
        <input className="chatbar-message" type="text" name="input" placeholder="Type a message and hit ENTER" onKeyDown={this.onSubmit}/>
      </footer>
      );
  }
}

export default ChatBar;
