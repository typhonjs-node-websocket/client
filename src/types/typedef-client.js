/**
 * @typedef {object} ClientOptionsParts - Defines the options for a WebSocket client by individual parts.
 *
 * @property {number}            port - port [0-65535].
 *
 * @property {string}            [host=localhost] - Host name.
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
 * @property {string}            host - Host name.
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

/**
 * @typedef {ClientOptionsURL|ClientOptionsParts}  NewClientOptions - Defines the options for a WebSocket client. The
 *                                                 address is specified as an URL or by parts plus additional options.
 */

/**
 * @typedef {object} WSClientOptionsBase - Defines the base `ws` options for Node WebSocket client.
 *
 * @property {boolean} [followRedirects=false] - Whether or not to follow redirects.
 *
 * @property {number} [handshakeTimeout] - Timeout in milliseconds for the handshake request. This is reset after every
 *                                      redirection.
 *
 * @property {number} [maxRedirects=10] The maximum number of redirects allowed.
 *
 * @property {boolean|object} [perMessageDeflate] - Enable / disable per message-deflate.
 *
 * @property {number} [protocolVersion] - Value of the Sec-WebSocket-Version header.
 *
 * @property {string} [origin] - Value of the Origin or Sec-WebSocket-Origin header depending on the protocolVersion.
 *
 * @property {number} [maxPayload] - The maximum allowed message size in bytes.
 */

/**
 * @typedef {object} HTTPRequest - Defines the options for Node HTTP request.
 *
 * @property {object|boolean} [agent] - Controls Agent behavior. Possible values:
 *                      undefined (default): use http.globalAgent for this host and port.
 *                      Agent object (http.Agent): explicitly use the passed in Agent.
 *                      false: causes a new Agent with default values to be used.
 *
 * @property {string}   [auth] - Basic authentication i.e. 'user:password' to compute an Authorization header.
 *
 * @property {Function} [createConnection] - A function that produces a socket / stream to use for the request when the
 * agent option is not used. This can be used to avoid creating a custom Agent class just to override the default
 * createConnection function. See agent.createConnection() for more details. Any Duplex stream is a valid return value.
 *
 * @property {number}   [defaultPort] - Default port for the protocol. Default: agent.defaultPort if an Agent is used,
 * else undefined.
 *
 * @property {number}   [family] - IP address family to use when resolving host or hostname. Valid values are 4 or 6.
 * When unspecified, both IP v4 and v6 will be used.
 *
 * @property {object}   [headers] - An object containing request headers.
 *
 * @property {number}   [hints] - Optional dns.lookup() hints.
 *
 * @property {string}   [host='localhost'] -  A domain name or IP address of the server to issue the request to.
 *
 * @property {string}   [hostname] - Alias for host. To support url.parse(), hostname will be used if both host and
 * hostname are specified.
 *
 * @property {boolean}  [insecureHTTPParser=false] - Use an insecure HTTP parser that accepts invalid HTTP headers when
 * true. Using the insecure parser should be avoided. See --insecure-http-parser for more information.
 *
 * @property {string}   [localAddress] - Local interface to bind for network connections.
 *
 * @property {number}   [localPort] - Local port to connect from.
 *
 * @property {Function} [lookup] - Custom lookup function. Default: dns.lookup().
 *
 * @property {number}   [maxHeaderSize=16384] - Optionally overrides the value of --max-http-header-size for requests
 * received from the server, i.e. the maximum length of response headers in bytes. Default: 16384 (16KB).
 *
 * @property {string}   [method='GET'] - A string specifying the HTTP request method.
 *
 * @property {string}   [path='/'] - Request path. Should include query string if any. E.G. '/index.html?page=12'. An
 * exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but
 * that may change in the future. Default: '/'.
 *
 * @property {number}   [port] - Port of remote server. Default: defaultPort if set, else 80.
 *
 * @property {string}   [protocol='http:'] - Protocol to use.
 *
 * @property {boolean}  [setHost=true] - Specifies whether or not to automatically add the Host header.
 *
 * @property {string}   [socketPath] - Unix Domain Socket (cannot be used if one of host or port is specified, those
 * specify a TCP Socket).
 *
 * @property {number}   [timeout] - A number specifying the socket timeout in milliseconds. This will set the timeout
 * before the socket is connected.
 *
 * @property {AbortSignal} [signal] - An AbortSignal that may be used to abort an ongoing request.
 *
 */

/**
 * @typedef {WSClientOptionsBase & HTTPRequest} WSClientOptions - Defines the `ws` options for Node WebSocket
 * client. Any other option allowed in http.request() or https.request(). Options given do not have any effect if parsed
 * from the URL given with the address parameter.
 */
