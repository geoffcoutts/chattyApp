import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      messages: [],
      currentUser: { name: 'Anonymous' },
      userCount: 0
    };
    this.ws = new WebSocket('ws://localhost:3001');
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentWillMount(){
    if (this.ws) {
      console.log('Connected to server');
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    // Receiving message from server. Will update state of message list and usercount
    this.ws.onmessage = (evt) => {
      let newMessage = JSON.parse(evt.data);

      const oldState = this.state.messages;
      this.setState({messages: [...oldState, newMessage]});
      if (newMessage.userCount) {
        this.setState({userCount: newMessage.userCount});
      }

    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length !== this.state.messages.length) {
      document.getElementsByClassName('messages')[0].scrollIntoView(false);
    }
  }

  addMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  changeUser(newUsername) {
    this.setState({currentUser: {name: newUsername}});
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
