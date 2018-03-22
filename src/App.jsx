import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      messages: [],
      currentUser: { username: 'Anonymous', color: 'blue' },
      userCount: 0,
    };
    this.ws = new WebSocket('ws://localhost:3001');
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
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
        this.setState({currentUser: newMessage.user});
        // console.log(this.state);
        return ;
      }
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

  changeUsername(newUserData) {
    // console.log(newUserData);

    this.setState({currentUser: {
      id: newUserData.id,
      name: newUserData.name,
      color: newUserData.color
    }});
  }

  render() {
    console.log("Rendering App");
    // console.log(this.state);
    return (
      <React.Fragment>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeUsername={this.changeUsername}/>
      </React.Fragment>
    );
  }
}
export default App;
