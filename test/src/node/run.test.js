import fs                     from 'fs-extra';

import * as Module            from '../../../src/node/index.js';

import WSTestServer           from '../common/WSTestServer.js';
import ClientTestsuiteRunner  from '../runner/client/TestsuiteRunner.js';
import ServerTestsuiteRunner  from '../runner/server/TestsuiteRunner.js';

fs.ensureDirSync('./.nyc_output');
fs.emptyDirSync('./.nyc_output');

fs.ensureDirSync('./coverage');
fs.emptyDirSync('./coverage');

const wsTestServer = new WSTestServer({ port: 8001 });

describe('', () =>
{
   after(async () =>
   {
      await wsTestServer.shutdown();
   });

   before(async () =>
   {
      await wsTestServer.start();
   });

   ClientTestsuiteRunner.run({ Module });
});

ServerTestsuiteRunner.run({ Module });


