import fs               from 'fs-extra';

import * as Module      from '../../../src/node/WSEventbus.js';

import WSTestServer     from '../common/WSTestServer.js';
import TestsuiteRunner  from '../runner/TestsuiteRunner.js';

import log              from 'why-is-node-running';

fs.ensureDirSync('./.nyc_output');
fs.emptyDirSync('./.nyc_output');

fs.ensureDirSync('./coverage');
fs.emptyDirSync('./coverage');

const wsTestServer = new WSTestServer();

describe('', () =>
{
   after(async () =>
   {
      await wsTestServer.shutdown();

      // setTimeout(function () {
      //    log() // logs out active handles that are keeping node running
      // }, 1000)
   });

   before(async () =>
   {
      await wsTestServer.start();
   })

   TestsuiteRunner.run({ Module });
});


