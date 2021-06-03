import TestsuiteRunner  from '@typhonjs-build-test/testsuite-runner';

import * as APIErrors     from './tests/APIErrors.js';
import * as WSEventbus    from './tests/WSEventbus.js';

import setClientOptions from '../../../src/utils/setClientOptions.js';

const data = {
   setClientOptions
};

export default new TestsuiteRunner({
   APIErrors,
   WSEventbus
}, data);
