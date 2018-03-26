import React from 'react';
import Message from './Message.jsx';

// Stores and populates all messages by looping through state of messages
const MessageList = ({ messages }) => (
  <main className="messages">
    {messages.map(message => <Message key={ message.id } messageData={ message } />)}
  </main>
);

export default MessageList;
