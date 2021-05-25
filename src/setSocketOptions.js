const s_DEFAULT_AUTO_CONNECT = true;
const s_DEFAULT_AUTO_RECONNECT = true;
const s_DEFAULT_MESSAGE_TIMEOUT = 10000;
const s_DEFAULT_RECONNECT_INTERVAL = 10000;
const s_DEFAULT_SERIALIZER = JSON;
const s_DEFAULT_SSL = false;

/**
 * @param {NewSocketOptions}  opts - Defines an object hash of required and optional parameters.
 *
 * @returns {SocketOptions} The complete socket options object.
 */
export default function setSocketOptions(opts)
{
   if (typeof opts.host !== 'string')
   {
      throw new TypeError(`'opts.host' is not a string.`);
   }

   opts.ssl = opts.ssl || s_DEFAULT_SSL;

   if (typeof opts.ssl !== 'boolean')
   {
      throw new TypeError(`'opts.ssl' is not a boolean.`);
   }

   opts.serializer = opts.serializer || s_DEFAULT_SERIALIZER;

   if (typeof opts.serializer !== 'object' || typeof opts.serializer.stringify !== 'function' ||
    typeof opts.serializer.parse !== 'function')
   {
      throw new TypeError(`'serializer' does not conform to the JSON API.`);
   }

   opts.autoConnect = opts.autoConnect || s_DEFAULT_AUTO_CONNECT;
   opts.autoReconnect = opts.autoReconnect || s_DEFAULT_AUTO_RECONNECT;
   opts.messageTimeout = opts.messageTimeout || s_DEFAULT_MESSAGE_TIMEOUT;
   opts.reconnectInterval = opts.reconnectInterval || s_DEFAULT_RECONNECT_INTERVAL;

   if (typeof opts.autoConnect !== 'boolean')
   {
      throw new TypeError(`'opts.autoConnect' is not a boolean.`);
   }

   if (typeof opts.autoReconnect !== 'boolean')
   {
      throw new TypeError(`'opts.autoReconnect' is not a boolean.`);
   }

   if (!Number.isInteger(opts.messageTimeout) || opts.messageTimeout < 0)
   {
      throw new TypeError(`'opts.messageTimeout' is not an integer or < 0.`);
   }

   if (!Number.isInteger(opts.reconnectInterval) || opts.reconnectInterval < 0)
   {
      throw new TypeError(`'opts.reconnectInterval' is not an integer or < 0.`);
   }

   if (typeof opts.socketIntercept !== 'undefined' && typeof opts.socketIntercept !== 'function')
   {
      throw new TypeError(`'opts.socketIntercept' is not a function.`);
   }

   opts.path = opts.path || 'websocket';

   if (typeof opts.path !== 'string')
   {
      throw new TypeError(`'opts.path' is not a string.`);
   }

   return {
      host: opts.host,
      ssl: opts.ssl,
      path: opts.path,
      endpoint: `${opts.ssl ? 'wss://' : 'ws://'}${opts.host}/${opts.path}`,
      serializer: opts.serializer,
      autoConnect: opts.autoConnect,
      autoReconnect: opts.autoReconnect,
      messageTimeout: opts.messageTimeout,
      reconnectInterval: opts.reconnectInterval,
      protocol: typeof opts.protocol === 'string' ? opts.protocol : void 0,
      socketIntercept: opts.socketIntercept
   };
}
