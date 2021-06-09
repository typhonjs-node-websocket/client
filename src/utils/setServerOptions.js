const s_DEFAULT_CONNECT_TIMEOUT = 5000;
const s_DEFAULT_HOST = 'localhost';
const s_DEFAULT_PORT = 8001;
const s_DEFAULT_MESSAGE_TIMEOUT = 10000;
const s_DEFAULT_SERIALIZER = JSON;
const s_DEFAULT_SSL = false;
const s_DEFAULT_TRIGGER = true;

/**
 * Parses any new server options setting default values as necessary.
 *
 * @param {NewServerOptions}  opts - Defines the options for a WebSocket server.
 *
 * @returns {ServerOptions} The parsed server options object.
 */
export default function setServerOptions(opts)
{
   if (opts === null || opts === void 0)
   {
      throw new TypeError(`'serverOptions' is null or undefined.`);
   }

   if (typeof opts !== 'object')
   {
      throw new TypeError(`'serverOptions' is not an object.`);
   }

   if (!Number.isInteger(opts.port) || (opts.port < 0 || opts.port > 65535))
   {
      throw new TypeError(`'serverOptions.port' is not an integer between [0-65535].`);
   }

   if (opts.host !== void 0 && typeof opts.host !== 'string')
   {
      throw new TypeError(`'serverOptions.host' is not a string.`);
   }

   opts.host = opts.host || s_DEFAULT_HOST;

   if (opts.ssl !== void 0 && typeof opts.ssl !== 'boolean')
   {
      throw new TypeError(`'serverOptions.ssl' is not a boolean.`);
   }

   opts.ssl = typeof opts.ssl === 'boolean' ? opts.ssl : s_DEFAULT_SSL;

   opts.serializer = opts.serializer || s_DEFAULT_SERIALIZER;

   if (typeof opts.serializer !== 'object' || typeof opts.serializer.stringify !== 'function' ||
    typeof opts.serializer.parse !== 'function')
   {
      throw new TypeError(`'serverOptions.serializer' does not conform to the JSON API.`);
   }

   if (opts.trigger !== void 0 && typeof opts.trigger !== 'boolean')
   {
      throw new TypeError(`'serverOptions.trigger' is not a boolean.`);
   }

   opts.trigger = typeof opts.trigger === 'boolean' ? opts.trigger : s_DEFAULT_TRIGGER;

   return {
      host: opts.host,
      port: opts.port,
      ssl: opts.ssl,
      serializer: opts.serializer,
      trigger: opts.trigger
   };
}
