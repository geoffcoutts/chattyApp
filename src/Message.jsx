import React, {Component} from 'react';

function Message ({messageData}) {
    const MessageDisplay = (messageData.type === "incomingNotification") ? (
        <div className="message">
          <span className="system">{messageData.content}</span>
        </div>
      ) : (
      <div className="message">
        <span className="message-username">{messageData.username}</span>
        <span className="message-content">{messageData.content}</span>
      </div>
      )
    console.log("Rendering Message");
    return (
      <div>
        {MessageDisplay}
      </div>
      );

}

export default Message;
