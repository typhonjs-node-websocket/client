import Eventbus            from '@typhonjs-plugin/eventbus';
import WebSocket           from 'ws';

import setServerOptions    from '../utils/setServerOptions.js';

const s_STR_EVENT_CONNECTION = 'socket:connection';
const s_STR_EVENT_LISTENING = 'socket:listening';

export default class WSServer extends Eventbus
{
   /**
    * The parsed server options.
    *
    * @type {ServerOptions}
    */
   #serverOptions;

   /**
    * Provides a unique ID for messages that is incremented in `get uniqueID`.
    * @type {number}
    */
   #uniqueID = 0;

   /**
    * Some WebSocket implementations may take an implementation specific options object as a third parameter.
    *
    * @type {WSServerOptions}
    */
   #wsOptions;

   #wss;

   /**
    * Create a WebSocket server.
    *
    * @param {NewServerOptions}  [serverOptions] - Defines the options for a WebSocket server.
    *
    * @param {WSServerOptions}   [wsOptions] - On Node `ws` is the WebSocket implementation. This object is
    *                                          passed to the `ws` WebSocket.Server.
    */
   constructor(serverOptions = void 0, wsOptions = void 0)
   {
      super();

      if (serverOptions !== void 0)
      {
         this.#serverOptions = setServerOptions(serverOptions);
         this.onSetServerOptions(this.#serverOptions);
      }

      if (wsOptions !== void 0 && typeof wsOptions !== 'object')
      {
         throw new TypeError(`'wsOptions' is not an object.`);
      }

      if (wsOptions !== void 0)
      {
         this.#wsOptions = wsOptions;
         this.onSetWSOptions(this.#wsOptions);
      }
   }

   /**
    * Returns a unique ID for messaging. The ID is incremented by 1 everytime this method is invoked.
    *
    * @returns {number} A unique ID for messaging.
    */
   get uniqueID() { return this.#uniqueID++; }

   get wss() { return this.#wss; }

   onListening(wss) {}

   /**
    * Invoked when serverOptions is set. Allows child classes to manipulate serverOptions.
    *
    * @param {ServerOptions}  serverOptions - The newly set serverOptions.
    */
   onSetServerOptions(serverOptions) {}

   /**
    * Invoked when wsOptions is set. Allows child classes to manipulate wsOptions.
    *
    * @param {WSServerOptions}   wsOptions - The newly set wsOptions.
    */
   onSetWSOptions(wsOptions) {}

   /**
    * Shutdown the server.
    *
    * @returns {Promise<void>} A Promise that resolves when server is shutdown.
    */
   async shutdown()
   {
      return new Promise((resolve, reject) =>
      {
         if (this.#wss)
         {
            this.#wss.once('error', () => reject());

            this.#wss.close(() =>
            {
               this.#wss.removeAllListeners();
               resolve();
            });
         }
         else
         {
            resolve();
         }
      });
   }

   /**
    * Start the server.
    *
    * @param {object}            options - Optional parameters.
    *
    * @param {NewServerOptions}  [options.serverOptions] - Defines the options for a WebSocket server.
    *
    * @param {WSServerOptions}   [options.wsOptions] - On Node `ws` is the WebSocket implementation. This object is
    *                                                  passed to the `ws` WebSocket.Server as options.
    *
    * @returns {Promise<void|object>} A Promise resolved when started or rejected with an error / timeout.
    */
   async start({ serverOptions = void 0, wsOptions = void 0 } = {})
   {
      if (this.#wss)
      {
         return Promise.reject({
            message: 'WSServer [start] already started server.',
            type: 'error'
         });
      }

      if (serverOptions !== void 0)
      {
         this.#serverOptions = setServerOptions(serverOptions);
         this.onSetServerOptions(this.#serverOptions);
      }

      if (wsOptions !== void 0 && typeof wsOptions !== 'object')
      {
         throw new TypeError(`'wsOptions' is not an object.`);
      }

      if (wsOptions !== void 0)
      {
         this.#wsOptions = wsOptions;
         this.onSetWSOptions(this.#wsOptions);
      }

      if (typeof this.#serverOptions !== 'object')
      {
         return Promise.reject({
            message: `WSServer [start] 'serverOptions' has not been set.`,
            type: 'error'
         });
      }

      const options = Object.assign({}, this.#wsOptions ? this.#wsOptions : {}, {
         host: this.#serverOptions.host,
         port: this.#serverOptions.port
      });

      this.#wss = new WebSocket.Server(options);

      return new Promise((resolve, reject) =>
      {
         this.#wss.once('error', reject);

         this.#wss.on('listening', () =>
         {
            this.#wss.removeListener('error', reject);

            this.#wss.on('connection', (ws) =>
            {
               if (this.#serverOptions.trigger) { super.trigger(s_STR_EVENT_CONNECTION, ws); }
            });

            this.onListening(this.#wss);

            if (this.#serverOptions.trigger) { super.triggerDefer(s_STR_EVENT_LISTENING, this.#wss); }

            resolve();
         });
      });
   }
}
