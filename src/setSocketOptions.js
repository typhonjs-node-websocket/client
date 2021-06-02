const s_DEFAULT_AUTO_CONNECT = false;
const s_DEFAULT_AUTO_RECONNECT = false;
const s_DEFAULT_BINARY_TYPE = 'blob';
const s_DEFAULT_HOST = 'localhost';
const s_DEFAULT_MESSAGE_TIMEOUT = 10000;
const s_DEFAULT_PATH = '/';
const s_DEFAULT_RECONNECT_INTERVAL = 10000;
const s_DEFAULT_SERIALIZER = JSON;
const s_DEFAULT_SSL = false;
const s_DEFAULT_TRIGGER = true;

/**
 * @param {NewSocketOptionsURL|NewSocketOptionsParts}  opts - Defines an object hash of required and optional
 *                                                            parameters.
 *
 * @returns {SocketOptions} The complete socket options object.
 */
export default function setSocketOptions(opts)
{
   if (opts.url !== void 0 && typeof opts.url !== 'string' && !(opts.url instanceof URL))
   {
      throw new TypeError(`'socketOptions.url' is not a string or URL.`);
   }

   let url = typeof opts.url === 'string' ? new URL(opts.url.toLowerCase()) : opts.url;

   if (url !== void 0 && !url.protocol.match(/^wss?/))
   {
      throw new TypeError(`'socketOptions.url' is not a WebSocket URL.`);
   }

   if ((url === void 0 && !Number.isInteger(opts.port)) || (opts.port < 0 || opts.port > 65535))
   {
      throw new TypeError(`'socketOptions.port' is not an integer between [0-65535].`);
   }

   if (opts.host !== void 0 && typeof opts.host !== 'string')
   {
      throw new TypeError(`'socketOptions.host' is not a string.`);
   }

   opts.host = opts.host || s_DEFAULT_HOST;

   if (opts.ssl !== void 0 && typeof opts.ssl !== 'boolean')
   {
      throw new TypeError(`'socketOptions.ssl' is not a boolean.`);
   }

   opts.ssl = typeof opts.ssl === 'boolean' ? opts.ssl : s_DEFAULT_SSL;

   if (opts.path !== void 0 && typeof opts.path !== 'string')
   {
      throw new TypeError(`'socketOptions.path' is not a string.`);
   }

   opts.path = typeof opts.path === 'string' ? opts.path : s_DEFAULT_PATH;

   // Add a leading slash if necessary to normalize path.
   if (!opts.path.startsWith('/')) { opts.path = `/${opts.path}`; }

   if (opts.binaryType !== void 0 && typeof opts.binaryType !== 'string')
   {
      throw new TypeError(`'socketOptions.binaryType' must be 'blob' or 'arraybuffer'.`);
   }

   if (opts.binaryType !== void 0 && opts.binaryType !== 'blob' && opts.binaryType !== 'arraybuffer')
   {
      throw new TypeError(`'socketOptions.binaryType' must be 'blob' or 'arraybuffer'.`);
   }

   opts.binaryType = typeof opts.binaryType === 'string' ? opts.binaryType : s_DEFAULT_BINARY_TYPE;


   opts.serializer = opts.serializer || s_DEFAULT_SERIALIZER;

   if (typeof opts.serializer !== 'object' || typeof opts.serializer.stringify !== 'function' ||
    typeof opts.serializer.parse !== 'function')
   {
      throw new TypeError(`'socketOptions.serializer' does not conform to the JSON API.`);
   }

   if (opts.autoConnect !== void 0 && typeof opts.autoConnect !== 'boolean')
   {
      throw new TypeError(`'socketOptions.autoConnect' is not a boolean.`);
   }

   if (opts.autoReconnect !== void 0 && typeof opts.autoReconnect !== 'boolean')
   {
      throw new TypeError(`'socketOptions.autoReconnect' is not a boolean.`);
   }

   if (opts.messageTimeout !== void 0 && (!Number.isInteger(opts.messageTimeout) || opts.messageTimeout < 0))
   {
      throw new TypeError(`'socketOptions.messageTimeout' is not an integer or < 0.`);
   }

   if (opts.reconnectInterval !== void 0 && (!Number.isInteger(opts.reconnectInterval) || opts.reconnectInterval < 0))
   {
      throw new TypeError(`'socketOptions.reconnectInterval' is not an integer or < 0.`);
   }


   opts.autoConnect = typeof opts.autoConnect === 'boolean' ? opts.autoConnect : s_DEFAULT_AUTO_CONNECT;
   opts.autoReconnect = typeof opts.autoReconnect === 'boolean' ? opts.autoReconnect : s_DEFAULT_AUTO_RECONNECT;
   opts.messageTimeout = opts.messageTimeout || s_DEFAULT_MESSAGE_TIMEOUT;
   opts.reconnectInterval = opts.reconnectInterval || s_DEFAULT_RECONNECT_INTERVAL;

   if (opts.trigger !== void 0 && typeof opts.trigger !== 'boolean')
   {
      throw new TypeError(`'socketOptions.trigger' is not a boolean.`);
   }

   opts.trigger = typeof opts.trigger === 'boolean' ? opts.trigger : s_DEFAULT_TRIGGER;

   if (opts.protocol !== void 0 && typeof opts.protocol !== 'string' && !Array.isArray(opts.protocol))
   {
      throw new TypeError(`'socketOptions.protocol' is not a string or string[].`);
   }

   opts.protocol = opts.protocol ? opts.protocol : [];

   // Set URL from parts
   if (url === void 0)
   {
      url = new URL(`${opts.ssl ? 'wss://' : 'ws://'}${opts.host}:${opts.port}${opts.path}`);
   }
   else  // Split parts from URL
   {
      opts.host = url.hostname;
      opts.port = Number.parseInt(url.port);
      opts.path = url.pathname;
      opts.ssl = url.protocol.startsWith('wss');
   }

   return {
      url: url.toString(),
      host: opts.host,
      port: opts.port,
      ssl: opts.ssl,
      path: opts.path,
      binaryType: opts.binaryType,
      serializer: opts.serializer,
      autoConnect: opts.autoConnect,
      autoReconnect: opts.autoReconnect,
      messageTimeout: opts.messageTimeout,
      reconnectInterval: opts.reconnectInterval,
      protocol: opts.protocol,
      trigger: opts.trigger
   };
}
