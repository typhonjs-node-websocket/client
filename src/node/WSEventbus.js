import WebSocket  from 'ws';

import WSSEventbus from '../WSEventbus.js';

export default class WSEventbus extends WSSEventbus
{
   /**
    * @param {NewSocketOptionsURL|NewSocketOptionsParts}  socketOptions - Options to create WebSocket.
    *
    * @param {object}            [wsImplOptions] - Some WebSocket implementations may take an implementation specific
    *                                              options object as a third parameter.
    */
   constructor(socketOptions, wsImplOptions = void 0)
   {
      super(WebSocket, socketOptions, wsImplOptions);
   }
}
