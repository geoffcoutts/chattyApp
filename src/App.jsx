import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import rando from './rando.js';




class App extends Component {
  constructor () {
    super();
    this.state = {
      messages: [
        // {
        //     id: rando(),
        //     type: "incomingMessage",
        //     content: "I won't be impressed with technology until I can download food.",
        //     username: "Anonymous1"
        // },
        // {
        //     id: rando(),
        //     type: "incomingNotification",
        //     content: "Anonymous1 changed their name to nomnom",
        // },
        // {
        //     id: rando(),
        //     type: "incomingMessage",
        //     content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
        //     username: "Anonymous2"
        // },
        // {
        //     id: rando(),
        //     type: "incomingMessage",
        //     content: "...",
        //     username: "nomnom"
        // },
        // {
        //     id: rando(),
        //     type: "incomingMessage",
        //     content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
        //     username: "Anonymous2"
        // },
        // {
        //     id: rando(),
        //     type: "incomingMessage",
        //     content: "This isn't funny. You're not funny",
        //     username: "nomnom"
        // },
        // {
        //     id: rando(),
        //     type: "incomingNotification",
        //     content: "Anonymous2 changed their name to NotFunny",

        // }

      ],
      currentUser: {name: "Anonymous"}
    };
    this.ws = new WebSocket("ws://localhost:3001");
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }



  addMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  changeUser(newUsername) {
    this.setState({currentUser: {name: newUsername}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.ws.onmessage = (evt) => {
      // console.log(evt.data);
      const newMessage = JSON.parse(evt.data);
      console.log(newMessage);
      const oldState = this.state.messages;
      this.setState({messages: [...oldState, newMessage]});
    };

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: rando(), type: "incomingMessage", content: "Hello there!", username: "Michelle"};
    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   console.log("Before setstate");
    //   this.setState({messages: messages});
    //   console.log("After setstate");
    // }, 3000);
  }
  render() {
    console.log("Rendering App");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeUser={this.changeUser}/>
      </div>
    );
  }
}
export default App;
