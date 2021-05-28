export function run({ Module, data, chai })
{
   // const { assert } = chai;
   const WSEventbus = Module.default;

   describe(`WSEventbus (${data.scopedName})`, () =>
   {
      let socket;

      afterEach(() =>
      {
         socket.disconnect();
      })

      beforeEach(() =>
      {
         socket = new WSEventbus({ host: 'localhost:8001', autoReconnect: false });
      })

      it('socket:open', (done) =>
      {
         socket.connect();

         socket.on('socket:open', () =>
         {
            console.log('socket:open');
            done();
            // socket.send({ msg: 'connect' });
         });
      });

      // socket.on('socket:close', () =>
      // {
      //    console.log('socket:close');
      // });
      //
      // socket.on('socket:message:in', (message) =>
      // {
      //    console.log(`socket:message:in - ${JSON.stringify(message)}`);
      // });
   });
}
