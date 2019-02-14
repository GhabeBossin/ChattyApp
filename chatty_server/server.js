/* eslint-disable no-console */
// WS server
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;
// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they get a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(data) {
    const parsedMsg = JSON.parse(data);
    // console.log(`USER: ${parsedMsg.username}, MESSAGE CONTENT:${parsedMsg.content}`);
    const sendMsgBack = {
      id      : uuidv1(),
      type    : 'incomingMessage',
      username: parsedMsg.username,
      content : parsedMsg.content
    }
    const stringifyMsgBack = JSON.stringify(sendMsgBack);
    wss.clients.forEach(function each(client) {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log('STRINGED',stringifyMsgBack);
        client.send(stringifyMsgBack);
      // }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

