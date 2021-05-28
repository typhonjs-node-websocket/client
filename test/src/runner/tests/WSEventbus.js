export function run({ Module, data, chai })
{
   const { assert } = chai;
   const WSEventbus = Module.default;

   describe(`WSEventbus (${data.scopedName}):`, () =>
   {
      describe(`socket events:`, () =>
      {
         let socket;

         afterEach(() =>
         {
            socket.disconnect();
         });

         beforeEach(() =>
         {
            socket = new WSEventbus({ port: 8001, binaryType: 'arraybuffer' });
         });

         it('socket:open', (done) =>
         {
            socket.connect();
            socket.on('socket:open', () => { done(); });
         });

         it('socket:close', (done) =>
         {
            socket.connect();
            socket.on('socket:open', () => socket.disconnect());
            socket.on('socket:close', () => { done(); });
         });

         it('socket:message:in (object)', (done) =>
         {
            socket.connect();
            socket.on('socket:open', () => socket.send({ msg: 'echo', id: 5 }));
            socket.on('socket:message:in', (data) =>
            {
               assert.isObject(data);
               assert.strictEqual(data.msg, 'echo');
               assert.strictEqual(data.id, 5);
               done();
            });
         });

         it('socket:message:in (Int8Array)', (done) =>
         {
            socket.connect();

            const outData = new Int8Array([1, 2, 3]);

            socket.on('socket:open', () => socket.send(outData));
            socket.on('socket:message:in', (data) =>
            {
               assert.isTrue(data instanceof ArrayBuffer);

               const view = new DataView(data);

               assert.strictEqual(view.getInt8(0), 1);
               assert.strictEqual(view.getInt8(1), 2);
               assert.strictEqual(view.getInt8(2), 3);

               done();
            });
         });

         it('sendAll / socket:message:in (object)', (done) =>
         {
            let cntr = 0;

            socket.connect();

            socket.on('socket:open', () =>
            {
               const outData = new Int8Array([1, 2, 3]);

               // Send mixed messages / object + data.
               socket.sendAll([{ msg: 'echo', id: 5 }, outData, { msg: 'echo', id: 15 }]);
            });

            socket.on('socket:message:in', (data) =>
            {
               switch (cntr)
               {
                  case 0:
                     assert.isObject(data);
                     assert.strictEqual(data.msg, 'echo');
                     assert.strictEqual(data.id, 5);
                     cntr++;
                     break;
                  case 1:
                     assert.isTrue(data instanceof ArrayBuffer);
                     cntr++;
                     break;
                  case 2:
                     assert.isObject(data);
                     assert.strictEqual(data.msg, 'echo');
                     assert.strictEqual(data.id, 15);
                     done();
                     break;
               }
            });
         });

         it('queue / socket:message:in (object)', (done) =>
         {
            let cntr = 0;

            // To hit the else branch of the default consumer function of queue.
            socket.queue.process();

            // Push three messages that are processed once connected.
            socket.queue.push({ msg: 'echo', id: 5 });
            socket.queue.pushAll([{ msg: 'echo', id: 10 }, { msg: 'echo', id: 15 }]);

            socket.connect();

            socket.on('socket:message:in', (data) =>
            {
               assert.isObject(data);
               assert.strictEqual(data.msg, 'echo');

               switch (cntr)
               {
                  case 0:
                     assert.strictEqual(data.id, 5);
                     cntr++;
                     break;
                  case 1:
                     assert.strictEqual(data.id, 10);
                     cntr++;
                     break;
                  case 2:
                     assert.strictEqual(data.id, 15);
                     done();
                     break;
               }
            });
         });
      });

      describe(`socketOptions:`, () =>
      {
         let socket;

         const options = (data = {}) => Object.assign({ port: 8001 }, data);

         afterEach(() =>
         {
            socket.disconnect();
         });

         it('autoConnect', (done) =>
         {
            socket = new WSEventbus(options({ autoConnect: true }));
            socket.on('socket:open', () => { done(); });
         });

         it('autoReconnect', (done) =>
         {
            socket = new WSEventbus(options({ autoReconnect: true, reconnectInterval: 500 }));

            socket.connect();

            socket.once('socket:open', () => socket.send({ msg: 'close' }));

            socket.once('socket:close', () => {
               socket.once('socket:open', () => {
                  socket.socketOptions.autoReconnect = false;
                  done();
               });
            });
         });

         it('get bufferedAmount', (done) =>
         {
            socket = new WSEventbus(options());

            assert.strictEqual(socket.bufferedAmount, 0);

            socket.connect();

            socket.on('socket:open', () => {
               assert.strictEqual(socket.bufferedAmount, 0);
               done();
            });
         });

         it('get connected', (done) =>
         {
            socket = new WSEventbus(options());

            assert.isFalse(socket.connected);

            socket.connect();

            socket.on('socket:open', () => {
               assert.isTrue(socket.connected);
               done();
            });
         });

         it('get extensions', (done) =>
         {
            socket = new WSEventbus(options());

            assert.strictEqual(socket.extensions, '');

            socket.connect();

            socket.on('socket:open', () => {
               assert.strictEqual(socket.extensions, '');
               done();
            });
         });

         it('get protocol', (done) =>
         {
            socket = new WSEventbus(options());

            assert.strictEqual(socket.protocol, '');

            socket.connect();

            socket.on('socket:open', () => {
               assert.strictEqual(socket.protocol, '');
               done();
            });
         });

         it('get readyState', (done) =>
         {
            socket = new WSEventbus(options());

            assert.strictEqual(socket.readyState, 3);

            socket.connect();

            assert.strictEqual(socket.readyState, 0);

            socket.on('socket:open', () =>
            {
               assert.strictEqual(socket.readyState, 1);
               socket.disconnect();
               assert.strictEqual(socket.readyState, 2);
            });

            socket.on('socket:close', () =>
            {
               assert.strictEqual(socket.readyState, 3);
               done();
            });
         });

         it('get socketOptions', () =>
         {
            socket = new WSEventbus(options());
            assert.deepEqual(socket.socketOptions, data.setSocketOptions(options()));
         });

         it('get url', (done) =>
         {
            socket = new WSEventbus(options());

            assert.strictEqual(socket.url, '');

            socket.connect();

            socket.on('socket:open', () => {
               assert.strictEqual(socket.url, 'ws://localhost:8001/');
               done();
            });
         });

         it('onerror (bad subprotocol)', (done) =>
         {
            socket = new WSEventbus(options({ protocol: 'foobar' }));
            socket.connect();
            socket.on('socket:error', (event) =>
            {
               assert.strictEqual(event.type, 'error');
               done();
            });
         });

         it('onmessage (not JSON)', (done) =>
         {
            socket = new WSEventbus(options());
            socket.connect();
            socket.on('socket:open', () => socket.send({ msg: 'not-json' }));
            socket.on('socket:message:in', (data) =>
            {
               assert.isString(data);
               assert.strictEqual(data, 'Not JSON');
               done();
            });
         });

         it('path', (done) =>
         {
            socket = new WSEventbus(options({ path: 'ws' }));
            socket.connect();
            socket.on('socket:open', () => { done(); });
         });

         it('protocol', (done) =>
         {
            socket = new WSEventbus(options({ protocol: 'foo' }));
            socket.connect();
            socket.on('socket:open', () => { done(); });
         });

         it('wsImplOptions (empty)', (done) =>
         {
            socket = new WSEventbus(options({ autoConnect: true }), {});
            socket.on('socket:open', () => done());
         });
      });
   });
}
