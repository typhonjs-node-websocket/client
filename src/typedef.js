/**
 * @typedef {object} ClientOptionsParts - Defines the options for a WebSocket client by individual parts.
 *
 * @property {number}            port - port [0-65535].
 *
 * @property {string}            [host=localhost] - host name / IP address.
 *
 * @property {boolean}           [ssl=false] - Indicates if an SSL connection is requested.
 *
 * @property {string}            [path] - Defines the websocket path.
 *
 * @property {BinaryType}        [binaryType='blob'] - Defines the socket binary type.
 *
 * @property {object}            [serializer=JSON] - An instance of an object which conforms to JSON for object
 *                                                   serialization.
 *
 * @property {boolean}           [autoConnect=false] - Indicates if socket should connect on construction.
 *
 * @property {boolean}           [autoReconnect=false] - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}            [connectTimeout=5000] - Indicates a timeout in ms for connection attempts.
 *
 * @property {number}            [messageTimeout=10000] - Indicates a timeout in ms for message responses.
 *
 * @property {number}            [reconnectInterval=10000] - Indicates socket reconnect interval in ms.
 *
 * @property {string|string[]}   [protocol] - Defines the websocket protocol(s).
 *
 * @property {boolean}           [trigger=true] - Trigger events on the eventbus for socket callbacks.
 */

/**
 * @typedef {object} ClientOptionsURL - Defines the options for a WebSocket client from an URL.
 *
 * @property {string|URL}        url - This should be the URL to which the WebSocket server will respond.
 *
 * @property {BinaryType}        [binaryType='blob'] - Defines the socket binary type.
 *
 * @property {object}            [serializer=JSON] - An instance of an object which conforms to JSON for object
 *                                                   serialization.
 *
 * @property {boolean}           [autoConnect=false] - Indicates if socket should connect on construction.
 *
 * @property {boolean}           [autoReconnect=false] - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}            [connectTimeout=5000] - Indicates a timeout in ms for connection attempts.
 *
 * @property {number}            [messageTimeout=10000] - Indicates a timeout in ms for message responses.
 *
 * @property {number}            [reconnectInterval=10000] - Indicates socket reconnect interval in ms.
 *
 * @property {string|string[]}   [protocol] - Defines the websocket protocol(s).
 *
 * @property {boolean}           [trigger=true] - Trigger events on the eventbus for socket callbacks.
 */

/**
 * @typedef {object} ClientOptions - Defines the parsed options for a WebSocket client.
 *
 * @property {string}            url - This should be the URL to which the WebSocket server will respond.
 *
 * @property {number}            port - port [0-65535].
 *
 * @property {string}            host - host name / IP address.
 *
 * @property {boolean}           ssl - Indicates if an SSL connection is requested.
 *
 * @property {string}            path - Defines the websocket path.
 *
 * @property {BinaryType}        binaryType - Defines the socket binary type.
 *
 * @property {object}            serializer - An instance of an object which conforms to JSON for object serialization.
 *
 * @property {boolean}           autoConnect - Indicates if socket should connect on construction.
 *
 * @property {boolean}           autoReconnect - Indicates if socket should reconnect on socket closed.
 *
 * @property {number}            connectTimeout - Indicates a timeout in ms for connection attempts.
 *
 * @property {number}            messageTimeout - Indicates a timeout in ms for message responses.
 *
 * @property {number}            reconnectInterval - Indicates socket reconnect interval in ms.
 *
 * @property {string|string[]}   protocol - Defines the websocket protocol(s)
 *
 * @property {boolean}           trigger - Trigger events on the eventbus for socket callbacks.
 */
