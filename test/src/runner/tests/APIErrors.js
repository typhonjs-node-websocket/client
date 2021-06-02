/**
 * @param {object}                        opts - Test options
 * @param {import('../../../../types')}   opts.Module - Module to test
 * @param {object}                        opts.data - Extra test data.
 * @param {object}                        opts.env - Test environment variables
 * @param {object}                        opts.chai - Chai
 */
export function run({ Module, data, env, chai })
{
   const { expect } = chai;

   const WSEventbus = Module.default;

   describe(`API Errors (${data.scopedName}):`, () =>
   {
      describe('connect:', () =>
      {
         it(`'timeout' must be a positive integer.`, async () =>
         {
            const socket = new WSEventbus({ port: 8001 });

            await expect(socket.connect(null)).to.be.rejectedWith(TypeError, `Cannot read property 'timeout' of null`);
         });

         it(`'timeout' must be a positive integer. (< 0)`, async () =>
         {
            const socket = new WSEventbus({ port: 8001 });

            await expect(socket.connect({ timeout: -1 })).to.be.rejectedWith(TypeError,
             `'timeout' must be a positive integer.`);
         });

         it(`'timeout' must be a positive integer. (bad type)`, async () =>
         {
            const socket = new WSEventbus({ port: 8001 });

            await expect(socket.connect({ timeout: false })).to.be.rejectedWith(TypeError,
             `'timeout' must be a positive integer.`);
         });
      });

      describe('setSocketOptions:', () =>
      {
         it(`'socketOptions' is null or undefined.`, () =>
         {
            expect(() => new WSEventbus(null)).to.throw(TypeError,
             `'socketOptions' is null or undefined.`);
         });

         it(`'socketOptions' is null or undefined.`, () =>
         {
            expect(() => new WSEventbus(void 0)).to.throw(TypeError,
             `'socketOptions' is null or undefined.`);
         });

         it(`'socketOptions' is not an object.`, () =>
         {
            expect(() => new WSEventbus(false)).to.throw(TypeError,
             `'socketOptions' is not an object.`);
         });

         it(`'socketOptions.url' is not a string or URL.`, () =>
         {
            expect(() => new WSEventbus({ url: false })).to.throw(TypeError,
             `'socketOptions.url' is not a string or URL.`);
         });

         it(`'socketOptions.url' is not a WebSocket URL.`, () =>
         {
            expect(() => new WSEventbus({ url: 'https://bad.com' })).to.throw(TypeError,
             `'socketOptions.url' is not a WebSocket URL.`);
         });

         it(`'socketOptions.port' is not an integer between [0-65535]. (not integer)`, () =>
         {
            expect(() => new WSEventbus({ port: false })).to.throw(TypeError,
             `'socketOptions.port' is not an integer between [0-65535].`);
         });

         it(`'socketOptions.port' is not an integer between [0-65535]. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: -1 })).to.throw(TypeError,
             `'socketOptions.port' is not an integer between [0-65535].`);
         });

         it(`'socketOptions.port' is not an integer between [0-65535]. (> 65535)`, () =>
         {
            expect(() => new WSEventbus({ port: 65536 })).to.throw(TypeError,
             `'socketOptions.port' is not an integer between [0-65535].`);
         });

         it(`'socketOptions.host' is not a string.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, host: false })).to.throw(TypeError,
             `'socketOptions.host' is not a string.`);
         });

         it(`'socketOptions.ssl' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0,  ssl: 0 })).to.throw(TypeError,
             `'socketOptions.ssl' is not a boolean.`);
         });

         it(`'socketOptions.binaryType' must be 'blob' or 'arraybuffer'. (not string)`, () =>
         {
            expect(() => new WSEventbus({ port: 0,  binaryType: false })).to.throw(TypeError,
             `'socketOptions.binaryType' must be 'blob' or 'arraybuffer'.`);
         });

         it(`'socketOptions.binaryType' must be 'blob' or 'arraybuffer'. (not 'blob' / 'arraybuffer')`, () =>
         {
            expect(() => new WSEventbus({ port: 0,  binaryType: 'bad' })).to.throw(TypeError,
             `'socketOptions.binaryType' must be 'blob' or 'arraybuffer'.`);
         });

         it(`'socketOptions.serializer' does not conform to the JSON API. (not object)`, () =>
         {
            expect(() => new WSEventbus({ port: 0,  serializer: 'bad' })).to.throw(TypeError,
             `'socketOptions.serializer' does not conform to the JSON API.`);
         });

         it(`'socketOptions.serializer' does not conform to the JSON API. (missing stringify)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, serializer: { parse: () => {} } })).to.throw(TypeError,
             `'socketOptions.serializer' does not conform to the JSON API.`);
         });

         it(`'socketOptions.serializer' does not conform to the JSON API. (missing parse)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, serializer: { stringify: () => {} } })).to.throw(TypeError,
             `'socketOptions.serializer' does not conform to the JSON API.`);
         });

         it(`'socketOptions.autoConnect' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, autoConnect: 0 })).to.throw(TypeError,
               `'socketOptions.autoConnect' is not a boolean.`);
         });

         it(`'socketOptions.autoReconnect' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, autoReconnect: 0 })).to.throw(TypeError,
             `'socketOptions.autoReconnect' is not a boolean.`);
         });

         it(`'socketOptions.connectTimeout' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, connectTimeout: false })).to.throw(TypeError,
             `'socketOptions.connectTimeout' is not an integer or < 0.`);
         });

         it(`'socketOptions.connectTimeout' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, connectTimeout: -1 })).to.throw(TypeError,
             `'socketOptions.connectTimeout' is not an integer or < 0.`);
         });

         it(`'socketOptions.messageTimeout' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, messageTimeout: false })).to.throw(TypeError,
             `'socketOptions.messageTimeout' is not an integer or < 0.`);
         });

         it(`'socketOptions.messageTimeout' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, messageTimeout: -1 })).to.throw(TypeError,
             `'socketOptions.messageTimeout' is not an integer or < 0.`);
         });

         it(`'socketOptions.reconnectInterval' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, reconnectInterval: false })).to.throw(TypeError,
             `'socketOptions.reconnectInterval' is not an integer or < 0.`);
         });

         it(`'socketOptions.reconnectInterval' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, reconnectInterval: -1 })).to.throw(TypeError,
             `'socketOptions.reconnectInterval' is not an integer or < 0.`);
         });

         it(`'socketOptions.path' is not a string.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, path: false })).to.throw(TypeError,
             `'socketOptions.path' is not a string.`);
         });

         it(`'socketOptions.protocol' is not a string or string[].`, () =>
         {
            expect(() => new WSEventbus({ port: 0, protocol: false })).to.throw(TypeError,
             `'socketOptions.protocol' is not a string or string[].`);
         });

         it(`'socketOptions.trigger' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, trigger: 0 })).to.throw(TypeError,
             `'socketOptions.trigger' is not a boolean.`);
         });
      });

      if (env.isNode)
      {
         describe('wsOptions', () =>
         {
            it(`'wsOptions' is not an object.`, () =>
            {
               expect(() => new WSEventbus({ port: 8001 }, false)).to.throw(TypeError, `'wsOptions' is not an object.`);
            });

            it(`'wsOptions' is not an object. (reconnect)`, async () =>
            {
               const socket = new WSEventbus({ port: 8001 });

               await socket.connect();

               await expect(socket.reconnect({ wsOptions: false })).to.be.rejectedWith(TypeError,
                `'wsOptions' is not an object.`);
            });
         });
      }
   });
}
