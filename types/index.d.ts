/**
 * - Defines the options for a WebSocket client by individual parts.
 */
type ClientOptionsParts = {
    /**
     * - port [0-65535].
     */
    port: number;
    /**
     * - host name / IP address.
     */
    host?: string;
    /**
     * - Indicates if an SSL connection is requested.
     */
    ssl?: boolean;
    /**
     * - Defines the websocket path.
     */
    path?: string;
    /**
     * - Defines the socket binary type.
     */
    binaryType?: BinaryType;
    /**
     * - An instance of an object which conforms to JSON for object
     *    serialization.
     */
    serializer?: object;
    /**
     * - Indicates if socket should connect on construction.
     */
    autoConnect?: boolean;
    /**
     * - Indicates if socket should reconnect on socket closed.
     */
    autoReconnect?: boolean;
    /**
     * - Indicates a timeout in ms for connection attempts.
     */
    connectTimeout?: number;
    /**
     * - Indicates a timeout in ms for message responses.
     */
    messageTimeout?: number;
    /**
     * - Indicates socket reconnect interval in ms.
     */
    reconnectInterval?: number;
    /**
     * - Defines the websocket protocol(s).
     */
    protocol?: string | string[];
    /**
     * - Trigger events on the eventbus for socket callbacks.
     */
    trigger?: boolean;
};
/**
 * - Defines the options for a WebSocket client from an URL.
 */
type ClientOptionsURL = {
    /**
     * - This should be the URL to which the WebSocket server will respond.
     */
    url: string | URL;
    /**
     * - Defines the socket binary type.
     */
    binaryType?: BinaryType;
    /**
     * - An instance of an object which conforms to JSON for object
     *    serialization.
     */
    serializer?: object;
    /**
     * - Indicates if socket should connect on construction.
     */
    autoConnect?: boolean;
    /**
     * - Indicates if socket should reconnect on socket closed.
     */
    autoReconnect?: boolean;
    /**
     * - Indicates a timeout in ms for connection attempts.
     */
    connectTimeout?: number;
    /**
     * - Indicates a timeout in ms for message responses.
     */
    messageTimeout?: number;
    /**
     * - Indicates socket reconnect interval in ms.
     */
    reconnectInterval?: number;
    /**
     * - Defines the websocket protocol(s).
     */
    protocol?: string | string[];
    /**
     * - Trigger events on the eventbus for socket callbacks.
     */
    trigger?: boolean;
};
/**
 * - Defines the parsed options for a WebSocket client.
 */
type ClientOptions = {
    /**
     * - This should be the URL to which the WebSocket server will respond.
     */
    url: string;
    /**
     * - port [0-65535].
     */
    port: number;
    /**
     * - host name / IP address.
     */
    host: string;
    /**
     * - Indicates if an SSL connection is requested.
     */
    ssl: boolean;
    /**
     * - Defines the websocket path.
     */
    path: string;
    /**
     * - Defines the socket binary type.
     */
    binaryType: BinaryType;
    /**
     * - An instance of an object which conforms to JSON for object serialization.
     */
    serializer: object;
    /**
     * - Indicates if socket should connect on construction.
     */
    autoConnect: boolean;
    /**
     * - Indicates if socket should reconnect on socket closed.
     */
    autoReconnect: boolean;
    /**
     * - Indicates a timeout in ms for connection attempts.
     */
    connectTimeout: number;
    /**
     * - Indicates a timeout in ms for message responses.
     */
    messageTimeout: number;
    /**
     * - Indicates socket reconnect interval in ms.
     */
    reconnectInterval: number;
    /**
     * - Defines the websocket protocol(s)
     */
    protocol: string | string[];
    /**
     * - Trigger events on the eventbus for socket callbacks.
     */
    trigger: boolean;
};
/**
 * - Defines the options for a WebSocket client. The
 *                                                 address is specified as an URL or by parts plus additional options.
 */
type NewClientOptions = ClientOptionsURL | ClientOptionsParts;
/**
 * - Defines the base `ws` options for Node WebSocket client.
 */
type WSOptionsBase = {
    /**
     * - Whether or not to follow redirects.
     */
    followRedirects?: boolean;
    /**
     * - Timeout in milliseconds for the handshake request. This is reset after every
     * redirection.
     */
    handshakeTimeout?: number;
    /**
     * The maximum number of redirects allowed.
     */
    maxRedirects?: number;
    /**
     * - Enable / disable per message-deflate.
     */
    perMessageDeflate?: boolean | object;
    /**
     * - Value of the Sec-WebSocket-Version header.
     */
    protocolVersion?: number;
    /**
     * - Value of the Origin or Sec-WebSocket-Origin header depending on the protocolVersion.
     */
    origin?: string;
    /**
     * - The maximum allowed message size in bytes.
     */
    maxPayload?: number;
};
/**
 * - Defines the options for Node HTTP request.
 */
type HTTPRequest = {
    /**
     * - Controls Agent behavior. Possible values:
     * undefined (default): use http.globalAgent for this host and port.
     * Agent object (http.Agent): explicitly use the passed in Agent.
     * false: causes a new Agent with default values to be used.
     */
    agent?: object | boolean;
    /**
     * - Basic authentication i.e. 'user:password' to compute an Authorization header.
     */
    auth?: string;
    /**
     * - A function that produces a socket / stream to use for the request when the
     * agent option is not used. This can be used to avoid creating a custom Agent class just to override the default
     * createConnection function. See agent.createConnection() for more details. Any Duplex stream is a valid return value.
     */
    createConnection?: Function;
    /**
     * - Default port for the protocol. Default: agent.defaultPort if an Agent is used,
     * else undefined.
     */
    defaultPort?: number;
    /**
     * - IP address family to use when resolving host or hostname. Valid values are 4 or 6.
     * When unspecified, both IP v4 and v6 will be used.
     */
    family?: number;
    /**
     * - An object containing request headers.
     */
    headers?: any;
    /**
     * - Optional dns.lookup() hints.
     */
    hints?: number;
    /**
     * -  A domain name or IP address of the server to issue the request to.
     */
    host?: string;
    /**
     * - Alias for host. To support url.parse(), hostname will be used if both host and
     * hostname are specified.
     */
    hostname?: string;
    /**
     * - Use an insecure HTTP parser that accepts invalid HTTP headers when
     * true. Using the insecure parser should be avoided. See --insecure-http-parser for more information.
     */
    insecureHTTPParser?: boolean;
    /**
     * - Local interface to bind for network connections.
     */
    localAddress?: string;
    /**
     * - Local port to connect from.
     */
    localPort?: number;
    /**
     * - Custom lookup function. Default: dns.lookup().
     */
    lookup?: Function;
    /**
     * - Optionally overrides the value of --max-http-header-size for requests
     * received from the server, i.e. the maximum length of response headers in bytes. Default: 16384 (16KB).
     */
    maxHeaderSize?: number;
    /**
     * - A string specifying the HTTP request method.
     */
    method?: string;
    /**
     * - Request path. Should include query string if any. E.G. '/index.html?page=12'. An
     * exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but
     * that may change in the future. Default: '/'.
     */
    path?: string;
    /**
     * - Port of remote server. Default: defaultPort if set, else 80.
     */
    port?: number;
    /**
     * - Protocol to use.
     */
    protocol?: string;
    /**
     * - Specifies whether or not to automatically add the Host header.
     */
    setHost?: boolean;
    /**
     * - Unix Domain Socket (cannot be used if one of host or port is specified, those
     * specify a TCP Socket).
     */
    socketPath?: string;
    /**
     * - A number specifying the socket timeout in milliseconds. This will set the timeout
     * before the socket is connected.
     */
    timeout?: number;
    /**
     * - An AbortSignal that may be used to abort an ongoing request.
     */
    signal?: AbortSignal;
};
/**
 * - Defines the `ws` options for Node WebSocket client. Any other
 * option allowed in http.request() or https.request(). Options given do not have any effect if parsed from the URL
 * given with the address parameter.
 */
type WSOptions = WSOptionsBase & HTTPRequest;

/**
 * Provides a single consumer queue.
 */
declare class Queue {
    /**
     * As the name implies, `consumer` is the sole consumer of the queue. It gets called with each element of the
     * queue and its return value serves as a ack, determining whether the element is removed or not from the queue,
     * allowing then subsequent elements to be processed.
     *
     * @param {Function} consumer - The sole consumer of the queue.
     */
    constructor(consumer: Function);
    /**
     * The consumer of the queue.
     *
     * @type {Function}
     */
    consumer: Function;
    /**
     * Storage for the queue.
     *
     * @type {Array}
     */
    queue: any[];
    /**
     * Pushes an element on the queue.
     *
     * @param {*}  element - An element.
     *
     * @returns {Queue} This queue instance.
     */
    push(element: any): Queue;
    /**
     * Pushes an element on the queue.
     *
     * @param {Iterable<*>}  elements - An array of elements.
     *
     * @returns {Queue} This queue instance.
     */
    pushAll(elements: Iterable<any>): Queue;
    /**
     * Processes the queue.
     *
     * @returns {Queue} This queue instance.
     */
    process(): Queue;
    /**
     * Empties the queue.
     *
     * @returns {Queue} This queue instance.
     */
    empty(): Queue;
}

/**
 * Provides a socket connection and forwarding of data via Eventbus events.
 */
declare class WSEventbus$1 {
    /**
     * Creates the socket.
     *
     * @param {Function|WebSocket}   WebSocketCtor - The constructor for the WebSocket implementation.
     *
     * @param {NewClientOptions}     clientOptions - Defines the options for a WebSocket client.
     *
     * @param {WSOptions}            [wsOptions] - On Node `ws` is the WebSocket implementation. This object is
     *                                             passed to the `ws` WebSocket.
     */
    constructor(WebSocketCtor: Function | WebSocket, clientOptions: NewClientOptions, wsOptions?: WSOptions);
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
    connect({ timeout }?: {
        timeout: number;
    }): Promise<void | object>;
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
    disconnect({ code, reason }?: {
        code?: number;
        reason?: string;
    }): Promise<void | object>;
    /**
     * Read-only property returns the number of bytes of data that have been queued using calls to send() but not yet
     * transmitted to the network. This value resets to zero once all queued data has been sent. This value does not
     * reset to zero when the connection is closed; if you keep calling send(), this will continue to climb.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/bufferedAmount
     * @returns {number} Current buffered amount.
     */
    get bufferedAmount(): number;
    /**
     * @returns {ClientOptions} Current client options
     */
    get clientOptions(): ClientOptions;
    /**
     * @returns {boolean} Current connected status.
     */
    get connected(): boolean;
    /**
     * Read-only property returns the extensions selected by the server. This is currently only the empty string or a
     * list of extensions as negotiated by the connection.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/extensions
     * @returns {string} Server extensions.
     */
    get extensions(): string;
    /**
     * Read-only property returns the name of the sub-protocol the server selected; this will be one of the strings
     * specified in the protocols parameter when creating the WebSocket object, or the empty string if no connection is
     * established.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/protocol
     * @returns {string} Server sub-protocol.
     */
    get protocol(): string;
    /**
     * @returns {Queue} The message queue.
     */
    get queue(): Queue;
    /**
     * Read-only property returns the current state of the WebSocket connection.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
     * @returns {number} Current state of WebSocket.
     */
    get readyState(): number;
    /**
     * Read-only property returns the absolute URL of the WebSocket as resolved by the constructor.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/url
     * @returns {string} Absolute URL of the WebSocket.
     */
    get url(): string;
    /**
     * Any 'ws' options set for Node WebSocket implementation.
     *
     * @returns {WSOptions}
     */
    get wsOptions(): WSOptions;
    /**
     * 'onclose' direct method callback.
     */
    onSocketClose(): void;
    /**
     * 'onerror' direct method callback.
     *
     * @param {object}   error - The error event.
     */
    onSocketError(error: object): void;
    /**
     * 'onmessage' direct method callback.
     *
     * @param {*}  data - The data received.
     */
    onSocketMessage(data: any): void;
    /**
     * 'onopen' direct method callback.
     */
    onSocketOpen(): void;
    /**
     * Reconnects the socket with potentially new client options. First disconnects if currently connected.
     *
     * @param {object}            options - Optional parameters.
     *
     * @param {NewClientOptions}  [options.clientOptions] - Defines the options for a WebSocket client.
     *
     * @param {WSOptions}         [options.wsOptions] - On Node `ws` is the WebSocket implementation. This object is
     *                                                  passed to the `ws` WebSocket.
     *
     * @param {number}            [options.code=1000] - A numeric value indicating the status code explaining why the
     *                            connection is being closed. If this parameter is not specified, a default value of 1000
     *                            is assumed indicating normal closure. See the list of status codes of CloseEvent for
     *                            permitted values.
     *
     * @param {string}            [options.reason='reconnecting'] - A human-readable string explaining why the connection
     *                            is closing. This string must be no longer than 123 bytes of UTF-8 text (not characters).
     *
     * @param {number}            [options.timeout=5000] - Indicates a timeout in ms for connection attempt.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
     *
     * @returns {Promise<void|object>} A Promise resolved when reconnected or rejected with an error / timeout.
     */
    reconnect({ clientOptions, wsOptions, code, reason, timeout }?: {
        clientOptions?: NewClientOptions;
        wsOptions?: WSOptions;
        code?: number;
        reason?: string;
        timeout?: number;
    }): Promise<void | object>;
    /**
     * Sends an object over the socket.
     *
     * @param {object|string|Blob|ArrayBuffer|ArrayBufferView}  data - The data to send.
     *
     * @returns {WSEventbus} This WSEventbus instance.
     */
    send(data: object | string | Blob | ArrayBuffer | ArrayBufferView): WSEventbus$1;
    /**
     * Sends an object over the socket.
     *
     * @param {Iterable<object|string|Blob|ArrayBuffer|ArrayBufferView>}  data - An array of data to send.
     *
     * @returns {WSEventbus} This WSEventbus instance.
     */
    sendAll(data: Iterable<object | string | Blob | ArrayBuffer | ArrayBufferView>): WSEventbus$1;
    #private;
}

declare class WSEventbus extends WSEventbus$1 {
    /**
     * @param {NewClientOptions}  clientOptions - Defines the options for a WebSocket client.
     *
     * @param {WSOptions}         [wsOptions] - On Node `ws` is the WebSocket implementation. This object is passed to
     *                                          the `ws` WebSocket as options.
     *
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
     */
    constructor(clientOptions: NewClientOptions, wsOptions?: WSOptions);
    #private;
}

export default WSEventbus;
