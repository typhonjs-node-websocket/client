/**
 * @param {object}                           opts - Test options
 *
 * @param {import('../../../../../types')}   opts.Module - Module to test
 *
 * @param {object}                           opts.data - Extra test data.
 *
 * @param {object}                           opts.chai - Chai
 */
export function run({ Module, data, chai })
{
   const { assert } = chai;

   const { WSServer } = Module;

   const options = (config = {}) => Object.assign({ port: 8001 }, config);

   describe(`WSServer (${data.scopedName}):`, () =>
   {
      let server;

      afterEach(async () =>
      {
         if (server) { await server.shutdown(); }
      });

      it('get uniqueID', () =>
      {
         server = new WSServer(options());

         assert.strictEqual(server.uniqueID, 0);
         assert.strictEqual(server.uniqueID, 1);
         assert.strictEqual(server.uniqueID, 2);
      });

      it ('get wss', async () =>
      {
         server = new WSServer(options());

         assert.isUndefined(server.wss);

         await server.start();

         assert.isDefined(server.wss);
      })

      it ('shutdown (no start)', async () =>
      {
         server = new WSServer(options());
         await server.shutdown();
      })

      it ('start (with options)', async () =>
      {
         server = new WSServer();

         await server.start({ serverOptions: options(), wsOptions: {} });
      })

      it ('setServerOptions (ssl / trigger)', async () =>
      {
         // Update this with proper tests.
         server = new WSServer(options({ ssl: true, trigger: false }));
      })
   });
}
