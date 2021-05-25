/**
 * - Defines the parameters to construct a new WSEventbus & WebSocket.
 */
type NewSocketOptions = {
    /**
     * - host name / port.
     */
    host: string;
    /**
     * - Indicates if an SSL connection is requested.
     */
    ssl?: boolean;
    /**
     * - An instance of an object which conforms to JSON for serialization.
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
     * - Indicates a timeout for message responses.
     */
    messageTimeout?: number;
    /**
     * - Indicates socket reconnect interval.
     */
    reconnectInterval?: number;
    /**
     * - Defines the websocket protocol.
     */
    protocol?: string;
    /**
     * - Defines the websocket path.
     */
    path?: string;
    /**
     * - Provides an intercept function for in / out messages. When invoked three
     *    parameters are passed: (string) message type, (*) message data,
     *    (object) parsed JSON object.
     */
    socketIntercept?: Function;
};
/**
 * - Defines the parsed options for WSEventbus.
 */
type SocketOptions = {
    /**
     * - host name / port.
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
     * - The constructed websocket endpoint.
     */
    endpoint: string;
    /**
     * - An instance of an object which conforms to JSON for serialization.
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
     * - Indicates a timeout for message responses.
     */
    messageTimeout: number;
    /**
     * - Indicates socket reconnect interval.
     */
    reconnectInterval: number;
    /**
     * - Defines the websocket protocol.
     */
    protocol?: string;
    /**
     * - Provides an intercept function for in / out messages. When invoked three
     *    parameters are passed: (string) message type, (*) message data,
     *    (object) parsed JSON object.
     */
    socketIntercept?: Function;
};

/**
 * Provides a socket connection and forwarding of data via TyphonEvents.
 */
declare class WSEventbus$1 {
    /**
     * Creates the socket.
     *
     * @param {Function|WebSocket}   WebSocketCtor - The constructor for the WebSocket implementation.
     *
     * @param {object}               socketOptions - The options hash generated from `setSocketOptions` defining the
     *                                               socket configuration.
     */
    constructor(WebSocketCtor: Function | WebSocket, socketOptions?: object);
    /**
     * The `open`, `error` and `close` events are simply proxy-ed to `_socket`. The `message` event is instead parsed
     * into a js object (if possible) and then passed as a parameter of the `message:in` event.
     *
     * @returns {WSEventbus} This WSEventbus instance.
     */
    connect(): WSEventbus$1;
    /**
     * Disconnects / closes the socket.
     *
     * @param {number}   [code] - A numeric value indicating the status code explaining why the connection is being
     *                            closed. If this parameter is not specified, a default value of 1005 is assumed. See
     *                            the list of status codes of CloseEvent for permitted values.
     *
     * @param {string}   [reason] - A human-readable string explaining why the connection is closing. This string must be
     *                              no longer than 123 bytes of UTF-8 text (not characters).
     *
     * @returns {WSEventbus} This WSEventbus instance.
     */
    disconnect(code?: number, reason?: string): WSEventbus$1;
    /**
     * Returns any associated socket intercept function.
     *
     * @returns {Function} Any set socket intercept function.
     */
    getSocketIntercept(): Function;
    /**
     * Sends an object over the socket.
     *
     * @param {*}  object - The object to send.
     *
     * @returns {WSEventbus} This WSEventbus instance.
     */
    send(object: any): WSEventbus$1;
    /**
     * Sets the socket intercept function which is invoked when a message is sent or received.
     *
     * @param {Function} interceptFunction - function that is invoked when a message is sent or received.
     */
    setSocketIntercept(interceptFunction: Function): void;
    #private;
}

declare class WSEventbus extends WSEventbus$1 {
    /**
     * @param {NewSocketOptions}  socketOptions - Options to create WebSocket.
     */
    constructor(socketOptions: NewSocketOptions);
    #private;
}

export default WSEventbus;
