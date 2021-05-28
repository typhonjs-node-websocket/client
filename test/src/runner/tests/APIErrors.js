export function run({ Module, data, chai })
{
   const { expect } = chai;
   const WSEventbus = Module.default;

   describe(`API Errors (${data.scopedName})`, () =>
   {
      describe('setSocketOptions', () =>
      {
         it(`'opts.host' is not a string.`, () =>
         {
            expect(() => new WSEventbus({ host: false })).to.throw(TypeError, `'opts.host' is not a string.`);
         });

         it(`'opts.ssl' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ host: '', ssl: 0 })).to.throw(TypeError, `'opts.ssl' is not a boolean.`);
         });

         it(`'opts.serializer' does not conform to the JSON API. (not object)`, () =>
         {
            expect(() => new WSEventbus({ host: '', serializer: 'bad' })).to.throw(TypeError,
             `'opts.serializer' does not conform to the JSON API.`);
         });

         it(`'opts.serializer' does not conform to the JSON API. (missing stringify)`, () =>
         {
            expect(() => new WSEventbus({ host: '', serializer: { parse: () => {} } })).to.throw(TypeError,
             `'opts.serializer' does not conform to the JSON API.`);
         });

         it(`'opts.serializer' does not conform to the JSON API. (missing parse)`, () =>
         {
            expect(() => new WSEventbus({ host: '', serializer: { stringify: () => {} } })).to.throw(TypeError,
             `'opts.serializer' does not conform to the JSON API.`);
         });

         it(`'opts.autoConnect' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ host: '', autoConnect: 0 })).to.throw(TypeError,
               `'opts.autoConnect' is not a boolean.`);
         });

         it(`'opts.autoReconnect' is not a boolean.`, () =>
         {
            expect(() => new WSEventbus({ host: '', autoReconnect: 0 })).to.throw(TypeError,
             `'opts.autoReconnect' is not a boolean.`);
         });

         it(`'opts.messageTimeout' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ host: '', messageTimeout: false })).to.throw(TypeError,
             `'opts.messageTimeout' is not an integer or < 0.`);
         });

         it(`'opts.messageTimeout' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ host: '', messageTimeout: -1 })).to.throw(TypeError,
             `'opts.messageTimeout' is not an integer or < 0.`);
         });

         it(`'opts.reconnectInterval' is not an integer or < 0. (not number)`, () =>
         {
            expect(() => new WSEventbus({ host: '', reconnectInterval: false })).to.throw(TypeError,
             `'opts.reconnectInterval' is not an integer or < 0.`);
         });

         it(`'opts.reconnectInterval' is not an integer or < 0. (< 0)`, () =>
         {
            expect(() => new WSEventbus({ host: '', reconnectInterval: -1 })).to.throw(TypeError,
             `'opts.reconnectInterval' is not an integer or < 0.`);
         });

         it(`'opts.path' is not a string.`, () =>
         {
            expect(() => new WSEventbus({ host: '', path: false })).to.throw(TypeError, `'opts.path' is not a string.`);
         });

         it(`'opts.protocol' is not a string or string[].`, () =>
         {
            expect(() => new WSEventbus({ host: '', protocol: false })).to.throw(TypeError,
             `'opts.protocol' is not a string or string[].`);
         });
      });
   });
}
