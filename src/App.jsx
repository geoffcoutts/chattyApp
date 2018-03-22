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

  componentWillMount(){
    if (this.ws) {
      console.log('Connected to server');
    }
    this.ws.onmessage = (evt) => {
      let userSetup = JSON.parse(evt.data);
      // console.log(userSetup);

      // this.setState({currentUser: userSetup});
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    // Receiving message from server. Will update state of message list and usercount
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

  componentDidUpdate(prevProps, prevState) {
    document.getElementsByClassName('messagesEnd')[0].scrollIntoView(false);
  }

  addMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  changeUsername(username) {
    let newUsername = this.state.currentUser;
    newUsername.username = username;
    this.setState({currentUser: newUsername});
  }

  changeColor(color) {
    let newColor = this.state.currentUser;
    newColor.color = color.hex;
    this.setState({ currentUser: newColor });
  }

  render() {
    console.log("Rendering App");
    console.log(this.state);
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
