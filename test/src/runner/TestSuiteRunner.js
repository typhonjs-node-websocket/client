import TestsuiteRunner  from '@typhonjs-build-test/testsuite-runner';

import * as APIErrors     from './tests/APIErrors.js';
import * as WSEventbus    from './tests/WSEventbus.js';

export default new TestsuiteRunner({
   APIErrors,
   WSEventbus
});
