/**
 * @typedef {object} NewSocketOptions - Defines the parameters to construct a new WSEventbus & WebSocket.
 *
 * @property {number}      port - port [0-65535].
 *
 * @property {string}      [host=localhost] - host name / IP address.
 *
 * @property {boolean}     [ssl=false] - Indicates if an SSL connection is requested.
 *
 * @property {string}      [path] - Defines the websocket path.
 *
 * @property {BinaryType}  [binaryType='blob'] - Defines the socket binary type.
 *
 * @property {object}      [serializer=JSON] - An instance of an object which conforms to JSON for object serialization.
 *
 * @property {boolean}     [autoConnect=false] - Indicates if socket should connect on construction.
 *
 * @property {boolean}     [autoReconnect=false] - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}      [messageTimeout=10000] - Indicates a timeout for message responses.
 *
 * @property {number}      [reconnectInterval=10000] - Indicates socket reconnect interval.
 *
 * @property {string|string[]}   [protocol] - Defines the websocket protocol(s).
 */

/**
 * @typedef {object} SocketOptions - Defines the parsed options for WSEventbus.
 *
 * @property {number}      port - port [0-65535].
 *
 * @property {string}      host - host name / IP address.
 *
 * @property {boolean}     ssl - Indicates if an SSL connection is requested.
 *
 * @property {string}      path - Defines the websocket path.
 *
 * @property {BinaryType}  binaryType - Defines the socket binary type.
 *
 * @property {string}      endpoint - The constructed websocket endpoint.
 *
 * @property {object}      serializer - An instance of an object which conforms to JSON for object serialization.
 *
 * @property {boolean}     autoConnect - Indicates if socket should connect on construction.
 *
 * @property {boolean}     autoReconnect - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}      messageTimeout - Indicates a timeout for message responses.
 *
 * @property {number}      reconnectInterval - Indicates socket reconnect interval.
 *
 * @property {string|string[]}   [protocol] - Defines the websocket protocol(s)
 */
