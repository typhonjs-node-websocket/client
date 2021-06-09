import { WSServer } from '../../../src/node/index.js';

export default class WSTestServer extends WSServer
{
   constructor(serverOptions = void 0)
   {
      super(serverOptions, {});
   }

   onSetWSOptions(wsOptions)
   {
      wsOptions.handleProtocols = () => 'foo';
   }

   onListening(wss)
   {
      this.on('socket:connection', (ws) =>
      {
         ws.on('message', (message) =>
         {
            const data = typeof message === 'string' ? JSON.parse(message) : message;

            if (data.constructor === Object)
            {
               switch (data.msg)
               {
                  case 'close':
                     ws.close();
                     break;
                  case 'echo':
                     ws.send(JSON.stringify({ msg: 'echo', id: data.id }));
                     break;
                  case 'not-json':
                     ws.send('Not JSON');
                     break;
               }
            }
            else
            {
               ws.send(data);
            }
         });
      });
   }
}
