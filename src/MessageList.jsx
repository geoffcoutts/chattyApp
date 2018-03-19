import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render () {
    console.log(this.props.messages)
    const Messages = this.props.messages.map((message) => {
      return (<Message messageData={message}/>)
    });
    return (
      <main className="messages">
        {Messages}
      </main>
      );
  }
}

export default MessageList;
