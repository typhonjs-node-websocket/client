import WebSocket from 'ws';

export default class WSTestServer
{
   constructor({ silent = false } = {})
   {
      this._options = {
         silent
      };
   }

   _init()
   {
      this._wss.on('connection', (ws) =>
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
   }

   _log(message)
   {
      if (!this._options.silent) { console.log(message); }
   }

   async shutdown()
   {
      return new Promise((resolve, reject) =>
      {
         if (this._wss)
         {
            this._wss.once('error', () => reject() )

            this._wss.close(() =>
            {
               this._wss.removeAllListeners();
               resolve();
            });
         }
         else
         {
            resolve();
         }
      });
   }

   async start()
   {
      return new Promise((resolve, reject) =>
      {
         this._wss = new WebSocket.Server({ host: 'localhost', port: 8001 });

         this._wss.on('error', () => reject());

         this._wss.on('listening', () =>
         {
            this._init();

            this._wss.removeAllListeners('error');

            const address = this._wss.address();
            this._log(`${s_GET_TIME()} WSTestServer is listening on (${address.address}:${address.port})`);
            resolve();
         });
      });
   }
}

const s_GET_TIME = () =>
{
   const date = new Date();

   let hour = date.getHours();
   if (hour < 10) { hour = `0${hour}`; }

   let minutes = date.getMinutes();
   if (minutes < 10) { minutes = `0${minutes}`; }

   let sec = date.getSeconds();
   if (sec < 10) { sec = `0${sec}`; }

   return `[${hour}:${minutes}:${sec}.${date.getMilliseconds()}]`;
}






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
