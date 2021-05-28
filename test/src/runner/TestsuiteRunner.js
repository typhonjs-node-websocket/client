import TestsuiteRunner  from '@typhonjs-build-test/testsuite-runner';

import * as APIErrors     from './tests/APIErrors.js';
import * as WSEventbus    from './tests/WSEventbus.js';

import setSocketOptions   from '../../../src/setSocketOptions.js';

const data = {
   setSocketOptions
};

export default new TestsuiteRunner({
   APIErrors,
   WSEventbus
}, data);
