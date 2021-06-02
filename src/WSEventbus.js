import Eventbus         from '@typhonjs-plugin/eventbus';

import Queue            from './Queue.js';
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
    * Stores the connection status. The default message queue consumer implementation checks for 'connected' status.
    *
    * @type {boolean}
    */
   #connected = false;

   /**
    * Provides a default single consumer message queue.
    *
    * @type {Queue}
    */
   #queue;

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
    *
    * @param {object}               [wsImplOptions] - Some WebSocket implementations may take an implementation specific
    *                                                 options object as a third parameter.
    */
   constructor(WebSocketCtor, socketOptions = {}, wsImplOptions = void 0)
   {
      super();

      this.#WebSocketCtor = WebSocketCtor;

      this.#socketOptions = setSocketOptions(socketOptions);

      this.#queue = new Queue((message) =>
      {
         if (this.#connected) { this.send(message); return true; }
         else { return false; }
      });

      /**
       * Some WebSocket implementations may take an implementation specific options object as a third parameter.
       *
       * @type {Object}
       * @protected
       */
      this._wsImplOptions = wsImplOptions;

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
      if (this._wsImplOptions !== void 0)
      {
         this.#socket = new this.#WebSocketCtor(this.url, this.#socketOptions.protocol,
          this._wsImplOptions);
      }
      else
      {
         this.#socket = new this.#WebSocketCtor(this.url, this.#socketOptions.protocol);
      }

      this.#socket.binaryType = this.#socketOptions.binaryType;

      this.#socket.onclose = () =>
      {
         this.#connected = false;
         this.#socket = void 0;

         this.onSocketClose();

         if (this.#socketOptions.trigger) { super.triggerDefer(s_STR_EVENT_CLOSE); }

         if (this.#socketOptions.autoReconnect)
         {
            // Schedule a reconnection
            setTimeout(this.connect.bind(this), this.#socketOptions.reconnectInterval);
         }
      };

      this.#socket.onerror = (error) =>
      {
         this.onSocketError(error);

         if (this.#socketOptions.trigger) { super.triggerDefer(s_STR_EVENT_ERROR, error); }
      };

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

         this.onSocketMessage(data);

         if (this.#socketOptions.trigger) { super.triggerDefer(s_STR_EVENT_MESSAGE_IN, data); }
      };

      this.#socket.onopen = () =>
      {
         this.#connected = true;

         this.onSocketOpen();

         if (this.#socketOptions.trigger) { super.triggerDefer(s_STR_EVENT_SOCKET_OPEN); }

         this.#queue.process();
      };

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
      if (this.#socket) { this.#socket.close(code, reason); }

      this.#queue.empty();

      this.#connected = false;

      return this;
   }

   get bufferedAmount() { return this.#socket ? this.#socket.bufferedAmount : 0; }

   get connected() { return this.#connected; }

   get extensions() { return this.#socket ? this.#socket.extensions : ''; }

   get protocol() { return this.#socket ? this.#socket.protocol : ''; }

   get queue() { return this.#queue; }

   get readyState() { return this.#socket ? this.#socket.readyState : 3; }

   get socketOptions() { return this.#socketOptions; }

   get url() { return this.#socket ? this.#socket.url : this.#socketOptions.url; }

   onSocketClose() {}

   /**
    * @param {object}   error - The error event.
    */
   onSocketError(error) {}

   /**
    * @param {*}  data - The data received.
    */
   onSocketMessage(data) {}

   onSocketOpen() {}

   /**
    * Sends an object over the socket.
    *
    * @param {object|string|Blob|ArrayBuffer|ArrayBufferView}  data - The data to send.
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   send(data)
   {
      if (this.#socket)
      {
         this.#socket.send(data.constructor === Object ? this.#socketOptions.serializer.stringify(data) : data);
      }

      return this;
   }

   /**
    * Sends an object over the socket.
    *
    * @param {Iterable<object|string|Blob|ArrayBuffer|ArrayBufferView>}  data - An array of data to send.
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   sendAll(data)
   {
      if (this.#socket)
      {
         for (const entry of data)
         {
            this.#socket.send(entry.constructor === Object ? this.#socketOptions.serializer.stringify(entry) : entry);
         }
      }

      return this;
   }
}
