// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const randomColor = require('randomcolor');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Store current clients in an array of objects that has metadeta associated with each one
const clientList = [];

//Send an input message to all users
wss.broadcast = broadcast = (data) => {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

// Generates random numbers to append to Anonymous username to differentiate people that do not change their name
const randomAnon = () => {
  const num = Math.floor(Math.random() * 9999);
  return ("000" + num).slice(-4);
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws, req) => {
  console.log('Client connected');

  // Initialize each user's colour and username
  const id = uuidv4();
  let username = "Anonymous" + randomAnon();
  let color = randomColor({ luminosity:"dark" });
  let user = { id, "ws": ws, username, color };
  clientList.push(user);

  // Sends setup datan to client upon connection
  ws.send(JSON.stringify({ type: "userSetup", user: { id, username, color } }));

  // Broadcast message to all clients when a new user joins
  const arrivalMessage = {
    id: uuidv4(),
    type: "incomingNotification",
    content: `${user.username} has joined the channel`,
    userCount: wss.clients.size,
    time: new Date().toLocaleTimeString("en-US", { hour12: true })
  };
  wss.broadcast(arrivalMessage);

  // Determines action upon receiving messages from clientside based on the type of message. Assigns unique IDs to the messages for rendering them client side in react. If the message is to update the username, it will then update that socket's associated username in the current clients array.
  ws.on('message', (evt) => {
    let messageData = JSON.parse(evt);
    messageData.id = uuidv4();
    messageData.time = new Date().toLocaleTimeString("en-US", { hour12: true });
    switch (messageData.type) {
      case ("postMessage"):
        messageData.type = "incomingMessage";
        break;
      case ("postNotification"):
        messageData.type = "incomingNotification";
        const index = clientList.findIndex((client)=> client.ws === ws);
        clientList[index].username = messageData.username;
        break;
    }
    wss.broadcast(messageData);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser. Will broadcast a message to the rest of the clients that the user has left the channel.
  ws.on('close', () => {
    console.log('Client disconnected');
    const index = clientList.findIndex((client)=> client.ws === ws);
    const departureMessage = {
      id: uuidv4(),
      type: "incomingNotification",
      content:`${clientList[index].username} has left the channel`,
      userCount: wss.clients.size,
      time: new Date().toLocaleTimeString("en-US", { hour12: true })
    };
    clientList.splice(index, 1);
    wss.broadcast(departureMessage);
  });
});