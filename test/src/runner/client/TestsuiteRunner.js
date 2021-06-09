import TestsuiteRunner  from '@typhonjs-build-test/testsuite-runner';

import * as APIErrors   from './tests/APIErrors.js';
import * as WSClient    from './tests/WSClient.js';

import setClientOptions from '../../../../src/utils/setClientOptions.js';

const data = {
   setClientOptions
};

export default new TestsuiteRunner({
   APIErrors,
   WSClient
}, data);
