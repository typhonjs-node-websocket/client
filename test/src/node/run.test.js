import fs                  from 'fs-extra';

import * as Module         from '../../../src/WSEventbus.js';

import TestsuiteRunner     from '../runner/TestsuiteRunner.js';

fs.ensureDirSync('./.nyc_output');
fs.emptyDirSync('./.nyc_output');

fs.ensureDirSync('./coverage');
fs.emptyDirSync('./coverage');

TestsuiteRunner.run({ Module });
