/* eslint-disable no-console */

// WS server
const PORT         = 3001;
const express      = require('express');
const SocketServer = require('ws').Server;
const WSServer     = require('ws')
const uuidv1       = require('uuid/v1');
const server       = express()

// Make the express server serve static assets (html, javascript, css) from the /public folder TODO: ??? what does this mean?
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WSServer.OPEN) { //client === ws && 
      client.send(data);
    }
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they get a socket, represented by the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('New client connection!');

  let incomingClientCount = {
    number: wss.clients.size
  }

  wss.broadcast(JSON.stringify(incomingClientCount));

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);
    if (parsedData.type === 'postMessage') {
      const incomingMessage = {
        id      : uuidv1(),
        type    : 'incomingMessage',
        username: parsedData.username,
        content : parsedData.content
      }
      const stringifyData = JSON.stringify(incomingMessage);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WSServer.OPEN) { //client !== ws && 
          client.send(stringifyData);
        }
      });
    } else if (parsedData.type === 'postNotification') {
      const incomingNotification = {
        id      : uuidv1(),
        type    : 'incomingNotification',
        username: parsedData.username,
        content : parsedData.content
      }
      const stringifyData = JSON.stringify(incomingNotification);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WSServer.OPEN) {
          client.send(stringifyData);
        }
      });
    }
  });

  ws.on('close', () => {
    let incomingClientCount = {
      number: wss.clients.size
    }
    wss.broadcast(JSON.stringify(incomingClientCount));
    console.log('Someone left :(')
  });

});

