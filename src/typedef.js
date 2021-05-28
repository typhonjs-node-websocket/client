/**
 * @typedef {object} NewSocketOptions - Defines the parameters to construct a new WSEventbus & WebSocket.
 *
 * @property {string}   host - host name / port.
 *
 * @property {boolean}  [ssl=false] - Indicates if an SSL connection is requested.
 *
 * @property {object}   [serializer=JSON] - An instance of an object which conforms to JSON for serialization.
 *
 * @property {boolean}  [autoConnect=true] - Indicates if socket should connect on construction.
 *
 * @property {boolean}  [autoReconnect=true] - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}   [messageTimeout=10000] - Indicates a timeout for message responses.
 *
 * @property {number}   [reconnectInterval=10000] - Indicates socket reconnect interval.
 *
 * @property {string|string[]}   [protocol] - Defines the websocket protocol(s).
 *
 * @property {string}   [path='websocket'] - Defines the websocket path.
 */

/**
 * @typedef {object} SocketOptions - Defines the parsed options for WSEventbus.
 *
 * @property {string}   host - host name / port.
 *
 * @property {boolean}  ssl - Indicates if an SSL connection is requested.
 *
 * @property {string}   path - Defines the websocket path.
 *
 * @property {string}   endpoint - The constructed websocket endpoint.
 *
 * @property {object}   serializer - An instance of an object which conforms to JSON for serialization.
 *
 * @property {boolean}  autoConnect - Indicates if socket should connect on construction.
 *
 * @property {boolean}  autoReconnect - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}   messageTimeout - Indicates a timeout for message responses.
 *
 * @property {number}   reconnectInterval - Indicates socket reconnect interval.
 *
 * @property {string|string[]}   [protocol] - Defines the websocket protocol(s)
 */
