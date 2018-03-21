import React, {Component} from 'react';

function Message ({messageData}) {
  // Set colour of text based on settings in server
  const color = {color: `${messageData.color}`,};

  // Find images in input string and render them instead of text
  const reg = /(\S+.jpg)/gi;
  let images ;
  let imagesHTML ;
  images = messageData.content.match(reg) || [];
    console.log(imagesHTML)
    const content = messageData.content.replace(reg, "");


  //Display system notification or incoming message based on messageData.type
  const MessageDisplay = (messageData.type === "incomingNotification") ? (
      <div className="message">
        <span className="system">{messageData.content}</span>
      </div>
    ) : (
      <div className="message">
        <span className="message-username" style={color}>{messageData.username}</span>
        <span className="message-content">{content}
        {
          images.map((image) => {
            return <img id={image} src={image}></img>
          })
        }</span>
      </div>
    )
    console.log(MessageDisplay);
  console.log("Rendering Message");
  return (
    <div>
      {MessageDisplay}
    </div>
  );

}

export default Message;
