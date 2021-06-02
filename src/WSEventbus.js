import Eventbus         from '@typhonjs-plugin/eventbus';

import Queue            from './utils/Queue.js';
import setClientOptions from './utils/setClientOptions.js';

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
    * The parsed client options.
    *
    * @type {ClientOptions}
    */
   #clientOptions;

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
    * Some WebSocket implementations may take an implementation specific options object as a third parameter.
    *
    * @type {object}
    */
   #wsOptions;

   /**
    * Creates the socket.
    *
    * @param {Function|WebSocket}                  WebSocketCtor - The constructor for the WebSocket implementation.
    *
    * @param {ClientOptionsURL|ClientOptionsParts} clientOptions - Defines the options for a WebSocket client by
    *                                                              individual parts or complete URL.
    *
    * @param {object}                              [wsOptions] - On Node `ws` is the WebSocket implementation. This
    *                                                            object is passed to the `ws` WebSocket.
    */
   constructor(WebSocketCtor, clientOptions, wsOptions = void 0)
   {
      super();

      if (wsOptions !== void 0 && typeof wsOptions !== 'object')
      {
         throw new TypeError(`'wsOptions' is not an object.`);
      }

      this.#WebSocketCtor = WebSocketCtor;

      this.#clientOptions = setClientOptions(clientOptions);

      this.#queue = new Queue((message) =>
      {
         if (this.#connected) { this.send(message); return true; }
         else { return false; }
      });

      this.#wsOptions = wsOptions;

      // Potentially schedule auto connection
      if (this.#clientOptions.autoConnect)
      {
         setTimeout(this.connect.bind(this), 0);
      }
   }

   /**
    * The `open`, `error` and `close` events are simply proxy-ed to `_socket`. The `message` event is instead parsed
    * into a js object (if possible) and then passed as a parameter of the `message:in` event.
    *
    * @param {object}   options - Optional parameters.
    *
    * @param {number}   options.timeout - Indicates a timeout in ms for connection attempt.
    *
    * @returns {Promise<void|object>} A Promise resolved when connected or rejected with an error / timeout.
    */
   async connect({ timeout = this.clientOptions.connectTimeout } = {})
   {
      if (!Number.isInteger(timeout) || timeout < 0)
      {
         throw new TypeError(`'timeout' must be a positive integer.`);
      }

      if (this.#socket)
      {
         return Promise.reject({
            message: 'WSEventbus [connect] already created WebSocket.',
            type: 'error'
         });
      }

      if (this.#wsOptions !== void 0)
      {
         this.#socket = new this.#WebSocketCtor(this.url, this.#clientOptions.protocol, this.#wsOptions);
      }
      else
      {
         this.#socket = new this.#WebSocketCtor(this.url, this.#clientOptions.protocol);
      }

      this.#socket.binaryType = this.#clientOptions.binaryType;

      this.#socket.onclose = () =>
      {
         this.#connected = false;
         this.#socket = void 0;

         this.onSocketClose();

         if (this.#clientOptions.trigger) { super.triggerDefer(s_STR_EVENT_CLOSE); }

         if (this.#clientOptions.autoReconnect)
         {
            // Schedule a reconnection
            setTimeout(this.connect.bind(this), this.#clientOptions.reconnectInterval);
         }
      };

      this.#socket.onerror = (error) =>
      {
         this.onSocketError(error);

         if (this.#clientOptions.trigger) { super.triggerDefer(s_STR_EVENT_ERROR, error); }
      };

      this.#socket.onmessage = (event) =>
      {
         let data;

         try
         {
            data = typeof event.data === 'string' ? this.#clientOptions.serializer.parse(event.data) : event.data;
         }
         catch (err)
         {
            data = event.data;
         }

         this.onSocketMessage(data);

         if (this.#clientOptions.trigger) { super.triggerDefer(s_STR_EVENT_MESSAGE_IN, data); }
      };

      this.#socket.onopen = () =>
      {
         this.#connected = true;

         this.onSocketOpen();

         if (this.#clientOptions.trigger) { super.triggerDefer(s_STR_EVENT_SOCKET_OPEN); }

         this.#queue.process();
      };

      return new Promise((resolve, reject) =>
      {
         const onTimeout = setTimeout(() =>
         {
            reject({ message: 'WSEventbus [connect] timed out.', type: 'error' });
         }, timeout);

         const onError = (error) =>
         {
            reject(error);
         }

         const onOpen = () =>
         {
            clearTimeout(onTimeout);

            if (this.#socket)
            {
               this.#socket.removeEventListener('error', onOpen);
               this.#socket.removeEventListener('error', onError);
            }

            resolve();
         }

         this.#socket.addEventListener('open', onOpen);
         this.#socket.addEventListener('error', onError);
      });
   }

   /**
    * Disconnects / closes the socket.
    *
    * @param {object}   options - Optional parameters.
    *
    * @param {number}   [options.code] - A numeric value indicating the status code explaining why the connection is
    *                                    being closed. If this parameter is not specified, a default value of 1005
    *                                    is assumed. See the list of status codes of CloseEvent for permitted values.
    *
    * @param {string}   [options.reason] - A human-readable string explaining why the connection is closing. This string
    *                                      must be no longer than 123 bytes of UTF-8 text (not characters).
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes
    *
    * @returns {Promise<void|object>} A Promise that resolves when socket is closed or rejected with an error.
    */
   async disconnect({ code, reason } = {})
   {
      let promise;

      if (this.#socket)
      {
         promise = new Promise((resolve, reject) =>
         {
            this.#socket.addEventListener('close', () =>
            {
               resolve();
            });
            this.#socket.addEventListener('error', (error) =>
            {
               reject(error);
            });
         })

         this.#socket.close(code, reason);
      }

      this.#connected = false;

      this.#queue.empty();

      return promise;
   }

   get bufferedAmount() { return this.#socket ? this.#socket.bufferedAmount : 0; }

   get clientOptions() { return this.#clientOptions; }

   get connected() { return this.#connected; }

   get extensions() { return this.#socket ? this.#socket.extensions : ''; }

   get protocol() { return this.#socket ? this.#socket.protocol : ''; }

   get queue() { return this.#queue; }

   get readyState() { return this.#socket ? this.#socket.readyState : 3; }

   get url() { return this.#socket ? this.#socket.url : this.#clientOptions.url; }

   get wsOptions() { return this.#wsOptions; }

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
    * Reconnects the socket with potentially new socket options. First disconnects if currently connected.
    *
    * @param {object}   options - Optional parameters.
    *
    * @param {ClientOptionsURL|ClientOptionsParts} [options.clientOptions] - Defines the options for a WebSocket client
    *                                                                        by individual parts or complete URL.
    *
    * @param {object}   [options.wsOptions] - On Node `ws` is the WebSocket implementation. This object is passed to
    *                                         the `ws` WebSocket.
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
   async reconnect({ clientOptions = void 0, wsOptions = void 0, code = 1000, reason = 'reconnecting', timeout } = {})
   {
      if (clientOptions !== void 0)
      {
         this.#clientOptions = setClientOptions(clientOptions);
      }

      if (wsOptions !== void 0 && typeof wsOptions !== 'object')
      {
         throw new TypeError(`'wsOptions' is not an object.`);
      }

      if (wsOptions !== void 0)
      {
         this.#wsOptions = wsOptions;
      }

      await this.disconnect({ code, reason });

      return this.connect({ timeout });
   }

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
         this.#socket.send(data.constructor === Object ? this.#clientOptions.serializer.stringify(data) : data);
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
            this.#socket.send(entry.constructor === Object ? this.#clientOptions.serializer.stringify(entry) : entry);
         }
      }

      return this;
   }
}
