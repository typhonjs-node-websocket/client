import WebSocket  from 'ws';

import WSSEventbus from '../WSEventbus.js';

export default class WSEventbus extends WSSEventbus
{
   /**
    * @param {NewSocketOptions}  socketOptions - Options to create WebSocket.
    */
   constructor(socketOptions)
   {
      super(WebSocket, socketOptions);
      Object.seal(this);
   }
}
