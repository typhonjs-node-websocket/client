import fs  from 'fs';

import dts from 'rollup-plugin-dts';

let banner = fs.readFileSync('./lib/types/typedef-server.d.ts', 'utf-8');
banner += `\n${fs.readFileSync('./lib/types/typedef-client.d.ts', 'utf-8')}`;

// Rollup the TS definitions generated in ./lib and add separate typedef.d.ts as a banner.

export default [
   {
      input: ['./lib/node/index.d.ts'],
      output: [{ banner, file: "types/index.d.ts", format: "es" }],
      plugins: [dts()],
   },
];
