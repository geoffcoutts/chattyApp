import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render () {
    console.log("Rendering MessageList")
    const Messages = this.props.messages.map((message) => {
      return (<Message key={message.id} messageData={message}/>)
    });
    return (
      <main className="messages">
        {Messages}
      </main>
      );
  }
}

export default MessageList;
