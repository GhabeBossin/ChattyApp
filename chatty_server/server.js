/* eslint-disable no-console */

// WS server
const PORT         = 3001;
const express      = require('express');
const SocketServer = require('ws').Server;
const uuidv1       = require('uuid/v1');
const server       = express()

// Make the express server serve static assets (html, javascript, css) from the /public folder TODO: ??? what does this mean?
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they get a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(data) {
    const parsedMsg   = JSON.parse(data);
    if (parsedMsg.username === 'Anonymous') {
      //apply sillyname instead, make sure each user keeps the same sillyname unless they change it.
    }
    const sendMsgBack = {
      id      : uuidv1(),
      type    : 'incomingMessage',
      username: parsedMsg.username,
      content : parsedMsg.content
    }
    const stringifyMsgBack = JSON.stringify(sendMsgBack);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) { //client !== ws && 
        client.send(stringifyMsgBack);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});

