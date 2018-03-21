import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {currentUser: {name :this.props.currentUser.name}};
    this.onSubmit = this.onSubmit.bind(this);
  }



  onSubmit (evt) {
      // console.log(evt.target);
      if (evt.key === "Enter") {
      const action = (evt.target.name === "input") ? (
          ()=>{
            evt.preventDefault();
            const username = this.state.currentUser.name;
            let content = evt.target.value;
            const type = "incomingMessage";
            const newMessage = {type, username, content};
            this.props.addMessage(newMessage);
            content = "";
          }
        ) : (
          () =>{
            // console.log(this.state.currentUser.name);
            this.props.changeUser(this.state.currentUser.name);
            const name = evt.target.value;
            this.setState({currentUser: {name}});
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
