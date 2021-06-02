import WSSEventbus from '../WSEventbus.js';

export default class WSEventbus extends WSSEventbus
{
   /**
    * @param {NewSocketOptionsURL|NewSocketOptionsParts}  socketOptions - Options to create WebSocket.
    */
   constructor(socketOptions)
   {
      super(WebSocket, socketOptions); // eslint-disable-line no-undef
   }
}
