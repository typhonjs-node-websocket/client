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
      });
   });
}
