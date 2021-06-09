/**
 * @typedef {object} NewServerOptions - Defines the options for a WebSocket server by individual parts.
 *
 * @property {number}            port - port [0-65535].
 *
 * @property {string}            [host=localhost] - host name.
 *
 * @property {boolean}           [ssl=false] - Indicates if an SSL connection is requested.
 *
 * @property {object}            [serializer=JSON] - An instance of an object which conforms to JSON for object
 *                                                   serialization.
 *
 * @property {boolean}           [trigger=true] - Trigger events on the eventbus for socket callbacks.
 */

/**
 * @typedef {object} ServerOptions - Defines the options for a WebSocket server.
 *
 * @property {number}            port - port [0-65535].
 *
 * @property {string}            host - host name.
 *
 * @property {boolean}           ssl - Indicates if an SSL connection is requested.
 *
 * @property {object}            serializer - An instance of an object which conforms to JSON for object
 *                                            serialization.
 *
 * @property {boolean}           trigger - Trigger events on the eventbus for socket callbacks.
 */

/**
 * @typedef {object} WSServerOptions - Defines the `ws` options for Node WebSocket server.
 *
 * @property {Function} [handleProtocols] - A function which can be used to handle the WebSocket sub-protocols.
 */
