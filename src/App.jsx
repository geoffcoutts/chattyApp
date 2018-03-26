import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      messages: [],
      currentUser: { username: 'Anonymous'},
      userCount: 0,
    };
    this.ws = new WebSocket('ws://localhost:3001');
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentWillMount() {
    if (this.ws) {
      console.log('Connected to server');
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    // Receiving message from server. Will update state of message list and usercount. Also used for initialized data from server.
    this.ws.onmessage = (evt) => {
      let newMessage = JSON.parse(evt.data);

      if (newMessage.type === "userSetup") {
        return this.setState({ currentUser: newMessage.user });
      }

      if (newMessage.userCount) {
        this.setState({ userCount: newMessage.userCount });
      }

      const oldMessages = this.state.messages;
      this.setState({ messages: [...oldMessages, newMessage] });
    };
  }

  // Scrolls to bottom of message list when they span the entire page
  componentDidUpdate(prevProps, prevState) {
    document.getElementsByClassName('messagesEnd')[0].scrollIntoView(false);
  }

  // Send a message to web socket server
  addMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  // Update state with new username
  changeUsername(username) {
    let newUsername = this.state.currentUser;
    newUsername.username = username;
    this.setState({currentUser: newUsername});
  }

  // Update state with new user color
  changeColor(color) {
    let newColor = this.state.currentUser;
    newColor.color = color.hex;
    this.setState({ currentUser: newColor });
  }

  render() {
    console.log("Rendering App");
    // console.log(this.state);
    return (
      <React.Fragment>
        <NavBar userCount={ this.state.userCount }/>
        <MessageList messages={ this.state.messages } />
        <div className="messagesEnd"/>
        <ChatBar
          currentUser={ this.state.currentUser }
          addMessage={ this.addMessage }
          changeUsername={ this.changeUsername }
          changeColor={ this.changeColor }
        />
      </React.Fragment>
    );
  }
}
export default App;
