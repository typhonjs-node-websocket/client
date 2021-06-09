import TestsuiteRunner  from '@typhonjs-build-test/testsuite-runner';

import * as APIErrors   from './tests/APIErrors.js';
import * as WSServer    from './tests/WSServer.js';

import setServerOptions from '../../../../src/utils/setServerOptions.js';

const data = {
   setServerOptions
};

export default new TestsuiteRunner({
   APIErrors,
   WSServer
}, data);
