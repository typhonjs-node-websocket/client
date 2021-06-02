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

   /**
    * Reconnects the socket with potentially new socket options. First disconnects if currently connected.
    *
    * @param {object}   options - Optional parameters.
    *
    * @param {NewSocketOptionsURL|NewSocketOptionsParts} [options.socketOptions] - The options hash generated from
    *                                                            `setSocketOptions` defining the socket configuration.
    *
    * @param {object}   [options.wsOptions] - Unused options for browser WebSocket.
    *
    * @param {number}   [options.code=1000] - A numeric value indicating the status code explaining why the
    *                           connection is being closed. If this parameter is not specified, a default value of 1000
    *                           is assumed indicating normal closure. See the list of status codes of CloseEvent for
    *                           permitted values.
    *
    * @param {string}   [options.reason='reconnecting'] - A human-readable string explaining why the connection is
    *                           closing. This string must be no longer than 123 bytes of UTF-8 text (not characters).
    *
    * @param {number}   [options.timeout=5000] - Indicates a timeout in ms for connection attempt.
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes
    * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
    *
    * @returns {Promise<void|object>} A Promise resolved when reconnected or rejected with an error / timeout.
    */
   async reconnect({ socketOptions = void 0, wsOptions = void 0, code = 1000, reason = 'reconnecting', timeout } = {})
   {
      return super.reconnect({ socketOptions, wsOptions, code, reason, timeout });
   }
}
