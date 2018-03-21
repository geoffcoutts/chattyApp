import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor () {
    super();
    this.state = {
      messages: [],
      currentUser: {name: "Anonymous"},
      userCount: 0
    };
    this.ws = new WebSocket("ws://localhost:3001");
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  addMessage(message) {
    console.log(message);
    this.ws.send(JSON.stringify(message));
  }

  changeUser(newUsername) {
    this.setState({currentUser: {name: newUsername}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.ws.onmessage = (evt) => {
      const newMessage = JSON.parse(evt.data);
      const oldState = this.state.messages;
      this.setState({messages: [...oldState, newMessage]});
      if (newMessage.userCount) {
        this.setState({userCount: newMessage.userCount});
      }
    };
  }
  render() {
    console.log("Rendering App");
    return (
      <React.Fragment>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeUser={this.changeUser}/>
      </React.Fragment>
    );
  }
}
export default App;
