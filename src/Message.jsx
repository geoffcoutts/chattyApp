import React, {Component} from 'react';

class Message extends Component {
  render () {
    console.log(this.props.messageData)
    return (
      <div className="message">
        <span className="message-username">{this.props.messageData.username}</span>
        <span className="message-content">{this.props.messageData.content}</span>
      </div>
      );
  }
}

export default Message;
