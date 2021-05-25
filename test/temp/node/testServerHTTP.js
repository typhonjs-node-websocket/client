#!/usr/bin/env node
/* eslint-disable */

import WebSocket from 'ws';
import http      from 'http';

const server = http.createServer((request, response) =>
{
   console.log((new Date()) + ' Received request for ' + request.url);
   response.writeHead(404);
   response.end();
});

server.listen(8001, () =>
{
   console.log((new Date()) + ' Server is listening on: ' + JSON.stringify(server.address()));
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) =>
{
   ws.on('message', (message) =>
   {
      const data = JSON.parse(message);

      console.log('received: %s', message);

      if (data.msg === 'connect')
      {
         ws.send(JSON.stringify({ msg: 'hello' }));

         ws.close();
      }
   });
});



// server.listen(8080);
//
// const wsServer = new WebSocket.Server({
//    httpServer: server,
//    // You should not use autoAcceptConnections for production
//    // applications, as it defeats all standard cross-origin protection
//    // facilities built into the protocol and the browser.  You should
//    // *always* verify the connection's origin and decide whether or not
//    // to accept it.
//    autoAcceptConnections: false
// });
//
// function originIsAllowed(origin)
// {
//    // put logic here to detect whether the specified origin is allowed.
//    return true;
// }
//
// wsServer.on('request', function(request)
// {
//    if (!originIsAllowed(request.origin))
//    {
//       // Make sure we only accept requests from an allowed origin
//       request.reject();
//       console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//       return;
//    }
//
//    const connection = request.accept('socketlogger', request.origin);
//
//    console.log((new Date()) + ' Connection accepted.');
//
//    connection.on('message', function (message)
//    {
//       if (message.type === 'utf8')
//       {
//          console.log('Received Message: ' + message.utf8Data);
//
//          var data = JSON.parse(message.utf8Data);
//
//          switch (data.msg)
//          {
//             case 'connect':
//                connection.sendUTF(JSON.stringify({ msg: 'connected' }));
//                break;
//          }
//       }
//    });
//
//    connection.on('close', function (reasonCode, description)
//    {
//       console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//    });
// });
