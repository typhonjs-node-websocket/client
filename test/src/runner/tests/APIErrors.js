export function run({ Module, data, chai })
{
   const { expect } = chai;
   const WSEventbus = Module.default;

   describe(`API Errors (${data.scopedName})`, () =>
   {
      describe('setSocketOptions', () =>
      {
         it(`'opts.port' is not an integer between [0-65535]. (not integer)`, () =>
         {
            expect(() => new WSEventbus({ port: false })).to.throw(TypeError,
             `'opts.port' is not an integer between [0-65535].`);
         });

         it(`'opts.port' is not an integer between [0-65535]. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: -1 })).to.throw(TypeError,
             `'opts.port' is not an integer between [0-65535].`);
         });

         it(`'opts.port' is not an integer between [0-65535]. (> 65535)`, () =>
         {
            expect(() => new WSEventbus({ port: 65536 })).to.throw(TypeError,
             `'opts.port' is not an integer between [0-65535].`);
         });

         it(`'opts.host' is not a string.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, host: false })).to.throw(TypeError, `'opts.host' is not a string.`);
         });

         it(`'opts.ssl' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0,  ssl: 0 })).to.throw(TypeError, `'opts.ssl' is not a boolean.`);
         });

         it(`'opts.serializer' does not conform to the JSON API. (not object)`, () =>
         {
            expect(() => new WSEventbus({ port: 0,  serializer: 'bad' })).to.throw(TypeError,
             `'opts.serializer' does not conform to the JSON API.`);
         });

         it(`'opts.serializer' does not conform to the JSON API. (missing stringify)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, serializer: { parse: () => {} } })).to.throw(TypeError,
             `'opts.serializer' does not conform to the JSON API.`);
         });

         it(`'opts.serializer' does not conform to the JSON API. (missing parse)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, serializer: { stringify: () => {} } })).to.throw(TypeError,
             `'opts.serializer' does not conform to the JSON API.`);
         });

         it(`'opts.autoConnect' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, autoConnect: 0 })).to.throw(TypeError,
               `'opts.autoConnect' is not a boolean.`);
         });

         it(`'opts.autoReconnect' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, autoReconnect: 0 })).to.throw(TypeError,
             `'opts.autoReconnect' is not a boolean.`);
         });

         it(`'opts.messageTimeout' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, messageTimeout: false })).to.throw(TypeError,
             `'opts.messageTimeout' is not an integer or < 0.`);
         });

         it(`'opts.messageTimeout' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, messageTimeout: -1 })).to.throw(TypeError,
             `'opts.messageTimeout' is not an integer or < 0.`);
         });

         it(`'opts.reconnectInterval' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, reconnectInterval: false })).to.throw(TypeError,
             `'opts.reconnectInterval' is not an integer or < 0.`);
         });

         it(`'opts.reconnectInterval' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ port: 0, reconnectInterval: -1 })).to.throw(TypeError,
             `'opts.reconnectInterval' is not an integer or < 0.`);
         });

         it(`'opts.path' is not a string.`, () =>
         {
            expect(() => new WSEventbus({ port: 0, path: false })).to.throw(TypeError, `'opts.path' is not a string.`);
         });

         it(`'opts.protocol' is not a string or string[].`, () =>
         {
            expect(() => new WSEventbus({ port: 0, protocol: false })).to.throw(TypeError,
             `'opts.protocol' is not a string or string[].`);
         });
      });
   });
}
