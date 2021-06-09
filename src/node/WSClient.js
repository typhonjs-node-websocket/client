import WebSocket        from 'ws';

import AbstractWSClient from '../AbstractWSClient.js';

/**
 * Provides the Node version of WSClient.
 */
export default class WSClient extends AbstractWSClient
{
   /**
    * @param {NewClientOptions}  [clientOptions] - Defines the options for a WebSocket client.
    *
    * @param {WSClientOptions}   [wsOptions] - On Node `ws` is the WebSocket implementation. This object is passed to
    *                                          the `ws` WebSocket as options.
    *
    * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketaddress-protocols-options
    */
   constructor(clientOptions = void 0, wsOptions = void 0)
   {
      super(WebSocket, clientOptions, wsOptions);
   }
}
