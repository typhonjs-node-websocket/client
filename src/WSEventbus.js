import Eventbus         from '@typhonjs-plugin/eventbus';

import setSocketOptions from './setSocketOptions.js';

const s_STR_EVENT_CLOSE = 'socket:close';
const s_STR_EVENT_ERROR = 'socket:error';
const s_STR_EVENT_MESSAGE_IN = 'socket:message:in';
const s_STR_EVENT_SOCKET_OPEN = 'socket:open';

/**
 * Provides a socket connection and forwarding of data via Eventbus events.
 */
export default class WSEventbus extends Eventbus
{
   /**
    * The socket options parameters.
    *
    * @type {SocketOptions}
    */
   #socketOptions;

   /**
    * @type {WebSocket}
    */
   #socket;

   /**
    * @type {Function|WebSocket}
    *
    * @private
    */
   #WebSocketCtor;

   /**
    * Creates the socket.
    *
    * @param {Function|WebSocket}   WebSocketCtor - The constructor for the WebSocket implementation.
    *
    * @param {object}               socketOptions - The options hash generated from `setSocketOptions` defining the
    *                                               socket configuration.
    */
   constructor(WebSocketCtor, socketOptions = {})
   {
      super();

      this.#WebSocketCtor = WebSocketCtor;

      this.#socketOptions = setSocketOptions(socketOptions);

      Object.seal(this);

      // Potentially schedule auto connection
      if (this.#socketOptions.autoConnect)
      {
         setTimeout(this.connect.bind(this), 0);
      }
   }

   /**
    * The `open`, `error` and `close` events are simply proxy-ed to `_socket`. The `message` event is instead parsed
    * into a js object (if possible) and then passed as a parameter of the `message:in` event.
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   connect()
   {
      if (this.#socketOptions.protocol !== void 0)
      {
         this.#socket = new this.#WebSocketCtor(this.#socketOptions.endpoint, this.#socketOptions.protocol);
      }
      else
      {
         this.#socket = new this.#WebSocketCtor(this.#socketOptions.endpoint);
      }

      this.#socket.binaryType = this.#socketOptions.binaryType;

      this.#socket.onclose = () =>
      {
         super.triggerDefer(s_STR_EVENT_CLOSE);

         if (this.#socketOptions.autoReconnect)
         {
            // Schedule a reconnection
            setTimeout(this.connect.bind(this), this.#socketOptions.reconnectInterval);
         }
      };

      this.#socket.onerror = (error) => { super.triggerDefer(s_STR_EVENT_ERROR, error); };

      this.#socket.onmessage = (event) =>
      {
         let data;

         try
         {
            data = typeof event.data === 'string' ? this.#socketOptions.serializer.parse(event.data) : event.data;
         }
         catch (err)
         {
            data = event.data;
         }

         super.triggerDefer(s_STR_EVENT_MESSAGE_IN, data);
      };

      this.#socket.onopen = () => { super.triggerDefer(s_STR_EVENT_SOCKET_OPEN); };

      return this;
   }

   /**
    * Disconnects / closes the socket.
    *
    * @param {number}   [code] - A numeric value indicating the status code explaining why the connection is being
    *                            closed. If this parameter is not specified, a default value of 1005 is assumed. See
    *                            the list of status codes of CloseEvent for permitted values.
    *
    * @param {string}   [reason] - A human-readable string explaining why the connection is closing. This string must be
    *                              no longer than 123 bytes of UTF-8 text (not characters).
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   disconnect(code, reason)
   {
      this.#socket.close(code, reason);

      return this;
   }

   get socketOptions() { return this.#socketOptions; }

   /**
    * Sends an object over the socket.
    *
    * @param {object|string|Blob|ArrayBuffer|ArrayBufferView}  message - The message to send.
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   send(message)
   {
      this.#socket.send(message.constructor === Object ? this.#socketOptions.serializer.stringify(message) : message);

      return this;
   }
}
