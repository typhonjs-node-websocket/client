import AbstractWSClient from '../AbstractWSClient.js';

/**
 * Provides the browser version of WSClient. The function overrides provide protection to not set any provided
 * 'wsOptions' as the browser WebSocket implementation doesn't take a 3rd options object parameter.
 */
export default class WSClient extends AbstractWSClient
{
   /**
    * @param {NewClientOptions}  [clientOptions] - Defines the options for a WebSocket client.
    *
    * @param {WSOptions}         [wsOptions] - On Node `ws` is the WebSocket implementation. This object is passed
    *                                          to the `ws` WebSocket. Ignored for the browser.
    */
   constructor(clientOptions = void 0, wsOptions = void 0) // eslint-disable-line no-unused-vars
   {
      super(WebSocket, clientOptions); // eslint-disable-line no-undef
   }

   /**
    * Connects the socket with potentially new client options.
    *
    * The `open`, `error` and `close` events are simply proxy-ed to `_socket`. The `message` event is instead parsed
    * into a js object (if possible) and then passed as a parameter of the `message:in` event.
    *
    * @param {object}            options - Optional parameters.
    *
    * @param {NewClientOptions}  [options.clientOptions] - Defines the options for a WebSocket client.
    *
    * @param {WSOptions}         [options.wsOptions] - On Node `ws` is the WebSocket implementation. This object is
    *                                                  passed to the `ws` WebSocket.
    *
    * @param {number}            [options.timeout] - Indicates a timeout in ms for connection attempt.
    *
    * @returns {Promise<void|object>} A Promise resolved when connected or rejected with an error / timeout.
    * @override
    */
   async connect({ clientOptions = void 0, wsOptions = void 0, timeout = void 0 } = {}) // eslint-disable-line no-unused-vars
   {
      return super.connect({ clientOptions, wsOptions: void 0, timeout });
   }

   /**
    * Reconnects the socket with potentially new client options. First disconnects if currently connected.
    *
    * @param {object}            [options] - Optional parameters.
    *
    * @param {NewClientOptions}  [options.clientOptions] - Defines the options for a WebSocket client.
    *
    * @param {WSOptions}         [options.wsOptions] - Unused options for browser WebSocket.
    *
    * @param {number}            [options.code=1000] - A numeric value indicating the status code explaining why the
    *                            connection is being closed. If this parameter is not specified, a default value of 1000
    *                            is assumed indicating normal closure. See the list of status codes of CloseEvent for
    *                            permitted values.
    *
    * @param {string}            [options.reason='reconnecting'] - A human-readable string explaining why the connection
    *                            is closing. This string must be no longer than 123 bytes of UTF-8 text (not
    *                            characters).
    *
    * @param {number}            [options.timeout=5000] - Indicates a timeout in ms for connection attempt.
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes
    * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
    *
    * @returns {Promise<void|object>} A Promise resolved when reconnected or rejected with an error / timeout.
    * @override
    */
   async reconnect({ clientOptions = void 0, wsOptions = void 0, code = 1000, reason = 'reconnecting', timeout } = {})  // eslint-disable-line no-unused-vars
   {
      return super.reconnect({ clientOptions, wsOptions: void 0, code, reason, timeout });
   }

   /**
    * Sets clientOptions / wsOptions. Most useful when loading options indirectly.
    *
    * @param {object}            options - Optional parameters.
    *
    * @param {NewClientOptions}  [options.clientOptions] - Defines the options for a WebSocket client.
    *
    * @param {WSOptions}         [options.wsOptions] - On Node `ws` is the WebSocket implementation. This object is
    *                                                  passed to the `ws` WebSocket.
    *
    * @override
    */
   setOptions({ clientOptions = void 0, wsOptions = void 0 } = {})   // eslint-disable-line no-unused-vars
   {
      super.setOptions({ clientOptions, wsOptions: void 0 });
   }
}
