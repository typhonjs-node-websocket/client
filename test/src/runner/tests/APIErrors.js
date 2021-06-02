/**
 * @param {object}                        opts - Test options
 * @param {import('../../../../types')}   opts.Module - Module to test
 * @param {object}                        opts.data - Extra test data.
 * @param {object}                        opts.chai - Chai
 */
export function run({ Module, data, chai })
{
   const { expect } = chai;

   const WSEventbus = Module.default;

   describe(`API Errors (${data.scopedName}):`, () =>
   {
      describe('setSocketOptions:', () =>
      {
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
   });
}
