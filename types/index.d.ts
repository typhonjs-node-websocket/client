/**
 * - Defines the parameters to construct a new WSEventbus & WebSocket.
 */
type NewSocketOptionsParts = {
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
 * - Defines the parameters to construct a new WSEventbus & WebSocket.
 */
type NewSocketOptionsURL = {
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
 * - Defines the parsed options for WSEventbus.
 */
type SocketOptions = {
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
     * @param {Function|WebSocket}                        WebSocketCtor - The constructor for the WebSocket
     *                                                                    implementation.
     *
     * @param {NewSocketOptionsURL|NewSocketOptionsParts} socketOptions - The options hash generated from
     *                                                                    `setSocketOptions` defining the socket
     *                                                                    configuration.
     *
     * @param {object}                                    [wsOptions] - On Node `ws` is the WebSocket implementation.
     *                                                                  This object is passed to the `ws` WebSocket.
     */
    constructor(WebSocketCtor: Function | WebSocket, socketOptions: NewSocketOptionsURL | NewSocketOptionsParts, wsOptions?: object);
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
    get bufferedAmount(): number;
    get connected(): boolean;
    get extensions(): string;
    get protocol(): string;
    get queue(): Queue;
    get readyState(): number;
    get socketOptions(): SocketOptions;
    get url(): string;
    get wsOptions(): any;
    onSocketClose(): void;
    /**
     * @param {object}   error - The error event.
     */
    onSocketError(error: object): void;
    /**
     * @param {*}  data - The data received.
     */
    onSocketMessage(data: any): void;
    onSocketOpen(): void;
    /**
     * Reconnects the socket with potentially new socket options. First disconnects if currently connected.
     *
     * @param {object}   options - Optional parameters.
     *
     * @param {NewSocketOptionsURL|NewSocketOptionsParts} [options.socketOptions] - The options hash generated from
     *                                                            `setSocketOptions` defining the socket configuration.
     *
     * @param {object}   [options.wsOptions] - On Node `ws` is the WebSocket implementation. This object is passed to
     *                                         the `ws` WebSocket.
     *
     * @param {number}   [options.code=1000] - A numeric value indicating the status code explaining why the
     *                           connection is being closed. If this parameter is not specified, a default value of 1000
     *                           is assumed indicating normal closure. See the list of status codes of CloseEvent for
     *                           permitted values.
     *
     * @param {string}   [options.reason='reconnecting'] - A human-readable string explaining why the connection is
     *                           closing. This string must be no longer than 123 bytes of UTF-8 text (not characters).
     *
     * @param {number}   [options.timeout=5000] - Indicates a timeout in ms for connection attempt.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
     *
     * @returns {Promise<void|object>} A Promise resolved when reconnected or rejected with an error / timeout.
     */
    reconnect({ socketOptions, wsOptions, code, reason, timeout }?: {
        socketOptions?: NewSocketOptionsURL | NewSocketOptionsParts;
        wsOptions?: object;
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
     * @param {NewSocketOptionsURL|NewSocketOptionsParts}  socketOptions - Options to create WebSocket.
     *
     * @param {object}                                    [wsOptions] - On Node `ws` is the WebSocket implementation.
     *                                                                  This object is passed to the `ws` WebSocket.
     *
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
     */
    constructor(socketOptions: NewSocketOptionsURL | NewSocketOptionsParts, wsOptions?: object);
    #private;
}

export default WSEventbus;
