import Eventbus         from '@typhonjs-plugin/eventbus';

import setSocketOptions from './setSocketOptions.js';

const s_STR_EVENT_CLOSE = 'socket:close';
const s_STR_EVENT_ERROR = 'socket:error';
const s_STR_EVENT_MESSAGE_IN = 'socket:message:in';
const s_STR_EVENT_MESSAGE_OUT = 'socket:message:out';
const s_STR_EVENT_SOCKET_OPEN = 'socket:open';

/**
 * Provides a socket connection and forwarding of data via TyphonEvents.
 */
export default class WSEventbus extends Eventbus
{
   /**
    * The socket options parameters.
    *
    * @type {SocketOptions}
    */
   #params;

   /**
    * @type {WebSocket}
    */
   #socket;

   /**
    * @type {Function}
    */
   #socketIntercept;

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

      this.#params = setSocketOptions(socketOptions);

      this.#socketIntercept = socketOptions.socketIntercept;

      // Potentially schedule auto connection
      if (this.#params.autoConnect)
      {
         setTimeout(this.connect.bind(this), 0);
      }

      Object.seal(this);
   }

   /**
    * The `open`, `error` and `close` events are simply proxy-ed to `_socket`. The `message` event is instead parsed
    * into a js object (if possible) and then passed as a parameter of the `message:in` event.
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   connect()
   {
      if (this.#params.protocol !== void 0)
      {
         this.#socket = new this.#WebSocketCtor(this.#params.endpoint, this.#params.protocol);
      }
      else
      {
         this.#socket = new this.#WebSocketCtor(this.#params.endpoint);
      }

      this.#socket.onclose = () =>
      {
         super.triggerDefer(s_STR_EVENT_CLOSE);

         if (this.#params.autoReconnect)
         {
            // Schedule a reconnection
            setTimeout(this.connect.bind(this), this.#params.reconnectInterval);
         }
      };

      this.#socket.onerror = (error) => { super.triggerDefer(s_STR_EVENT_ERROR, error); };

      this.#socket.onmessage = (message) =>
      {
         let object;

         try { object = this.#params.serializer.parse(message.data); }
         catch (ignore) { return; /* ignore */ }

         // If there is an attached socket intercept function then invoke it.
         if (this.#socketIntercept)
         {
            this.#socketIntercept(s_STR_EVENT_MESSAGE_IN, message.data, object);
         }

         // Outside the try-catch block as it must only catch JSON parsing
         // errors, not errors that may occur inside a `message:in` event handler.
         super.triggerDefer(s_STR_EVENT_MESSAGE_IN, object);
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

   /**
    * Returns any associated socket intercept function.
    *
    * @returns {Function} Any set socket intercept function.
    */
   getSocketIntercept()
   {
      return this.#socketIntercept;
   }

   /**
    * Sends an object over the socket.
    *
    * @param {object}  object - The object to send.
    *
    * @returns {WSEventbus} This WSEventbus instance.
    */
   send(object)
   {
      const message = this.#params.serializer.stringify(object);

      // If there is an attached socket intercept function then invoke it.
      if (this.#socketIntercept)
      {
         this.#socketIntercept(s_STR_EVENT_MESSAGE_OUT, message, object);
      }

      this.#socket.send(message);

      return this;
   }

   /**
    * Sets the socket intercept function which is invoked when a message is sent or received.
    *
    * @param {Function} interceptFunction - function that is invoked when a message is sent or received.
    */
   setSocketIntercept(interceptFunction)
   {
      if (typeof interceptFunction !== 'function')
      {
         throw new TypeError(`'interceptFunction' is not a function.`);
      }

      this.#socketIntercept = interceptFunction;
   }
}
