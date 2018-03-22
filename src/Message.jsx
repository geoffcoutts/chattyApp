import React from 'react';

const Message = ({messageData}) => {
  // Set colour of text based on settings in server
  const color = {color: `${messageData.color}`};

  // Find images in input string and render them instead of text
  const reg = /(\S+.jpg)|(\S+.png)|(\S+.gif)/gi;
  let images ;
  images = messageData.content.match(reg) || [];
  const content = messageData.content.replace(reg, "");
  const imageHTML = images.map((image) => {
    return <img className="message-image" id={image} src={image}></img>
  })

  //Display system notification or incoming message based on messageData.type
  const MessageDisplay = (messageData.type === "incomingNotification") ? (
      <div className="message">
        <span className="system">{messageData.content}</span>
      </div>
    ) : (
      <div className="message">
        <span className="message-username" style={color}>{messageData.username}</span>
        <span className="message-content">{content}{imageHTML}</span>
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
