import path       from 'path';

import { babel }  from '@rollup/plugin-babel';        // Babel is used for private class fields for browser usage.
import resolve    from '@rollup/plugin-node-resolve';
import istanbul   from 'rollup-plugin-istanbul';      // Adds Istanbul instrumentation.

// The test browser distribution is bundled to `./test/public`.
const s_TEST_BROWSER_PATH = './test/public';

// Produce sourcemaps or not.
const s_SOURCEMAP = true;

const relativeTestBrowserPath = path.relative(`${s_TEST_BROWSER_PATH}`, '.');

export default () =>
{
   return [{ // This bundle is for the Istanbul instrumented browser test.
         input: ['src/browser/WSEventbus.js'],
         output: [{
            file: `${s_TEST_BROWSER_PATH}/WSEventbus.js`,
            format: 'es',
            preferConst: true,
            sourcemap: s_SOURCEMAP,
            sourcemapPathTransform: (sourcePath) => sourcePath.replace(relativeTestBrowserPath, `.`)
         }],
         plugins: [
            resolve({ browser: true }),
            babel({
               babelHelpers: 'bundled',
               presets: [
                  ['@babel/preset-env', {
                     bugfixes: true,
                     shippedProposals: true,
                     targets: { esmodules: true }
                  }]
               ]
            }),
            istanbul()
         ]
      },

      // This bundle is the test suite
      {
         input: ['test/src/runner/TestSuiteRunner.js'],
         output: [{
            file: `${s_TEST_BROWSER_PATH}/TestSuiteRunner.js`,
            format: 'es',
            preferConst: true
         }],
         plugins: [
            resolve({ browser: true })
         ]
      }
   ];
};
