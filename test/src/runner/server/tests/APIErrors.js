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
   const { expect } = chai;

   const { WSServer } = Module;

   const options = (config = {}) => Object.assign({ port: 8001 }, config);

   describe(`API Errors (${data.scopedName}):`, () =>
   {
      describe('start:', () =>
      {
         let server;

         afterEach(async () =>
         {
            if (server) { await server.shutdown(); }
         });

         it('start (multiple times)', async () =>
         {
            server = new WSServer(options());

            await server.start();
            await expect(server.start()).to.be.rejectedWith('WSServer [start] already started server.');
         });

         it('start (no options)', async () =>
         {
            server = new WSServer();

            await expect(server.start()).to.be.rejectedWith(`WSServer [start] 'serverOptions' has not been set.`);
         });

         it('start (wsOptions not object)', async () =>
         {
            server = new WSServer();

            await expect(server.start({ wsOptions: false })).to.be.rejectedWith(TypeError,
             `'wsOptions' is not an object.`);
         });
      });

      describe('setServerOptions:', () =>
      {
         it(`'serverOptions' is null or undefined.`, () =>
         {
            expect(() => new WSServer(null)).to.throw(TypeError,
             `'serverOptions' is null or undefined.`);
         });

         it(`'serverOptions' is not an object.`, () =>
         {
            expect(() => new WSServer(false)).to.throw(TypeError,
             `'serverOptions' is not an object.`);
         });

         it(`'serverOptions.port' is not an integer between [0-65535]. (not integer)`, () =>
         {
            expect(() => new WSServer({ port: false })).to.throw(TypeError,
             `'serverOptions.port' is not an integer between [0-65535].`);
         });

         it(`'serverOptions.port' is not an integer between [0-65535]. (< 0)`, () =>
         {
            expect(() => new WSServer({ port: -1 })).to.throw(TypeError,
             `'serverOptions.port' is not an integer between [0-65535].`);
         });

         it(`'serverOptions.port' is not an integer between [0-65535]. (> 65535)`, () =>
         {
            expect(() => new WSServer({ port: 65536 })).to.throw(TypeError,
             `'serverOptions.port' is not an integer between [0-65535].`);
         });

         it(`'serverOptions.host' is not a string.`, () =>
         {
            expect(() => new WSServer({ port: 0, host: false })).to.throw(TypeError,
             `'serverOptions.host' is not a string.`);
         });

         it(`'serverOptions.ssl' is not a boolean.`, () =>
         {
            expect(() => new WSServer({ port: 0,  ssl: 0 })).to.throw(TypeError,
             `'serverOptions.ssl' is not a boolean.`);
         });

         it(`'serverOptions.serializer' does not conform to the JSON API. (not object)`, () =>
         {
            expect(() => new WSServer({ port: 0,  serializer: 'bad' })).to.throw(TypeError,
             `'serverOptions.serializer' does not conform to the JSON API.`);
         });

         it(`'serverOptions.serializer' does not conform to the JSON API. (missing stringify)`, () =>
         {
            expect(() => new WSServer({ port: 0, serializer: { parse: () => {} } })).to.throw(TypeError,
             `'serverOptions.serializer' does not conform to the JSON API.`);
         });

         it(`'serverOptions.serializer' does not conform to the JSON API. (missing parse)`, () =>
         {
            expect(() => new WSServer({ port: 0, serializer: { stringify: () => {} } })).to.throw(TypeError,
             `'serverOptions.serializer' does not conform to the JSON API.`);
         });

         it(`'serverOptions.trigger' is not a boolean.`, () =>
         {
            expect(() => new WSServer({ port: 0, trigger: 0 })).to.throw(TypeError,
             `'serverOptions.trigger' is not a boolean.`);
         });

         it(`'wsOptions' is not an object.`, () =>
         {
            expect(() => new WSServer({ port: 8001 }, false)).to.throw(TypeError, `'wsOptions' is not an object.`);
         });
      });
   });
}
