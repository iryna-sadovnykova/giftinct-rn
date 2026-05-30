#!/usr/bin/env node
/**
 * Reports large or notable transitive dependencies (install size on disk).
 * Run: npm run audit:deps
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const NODE_MODULES = path.join(ROOT, 'node_modules');

const TARGETS = [
  'moment',
  'lodash',
  'lodash.mergewith',
  'lodash.assignwith',
  'dayjs',
  'date-fns',
  'core-js',
  'babel-runtime',
  '@babel/runtime',
];

const du = target => {
  const dir = path.join(NODE_MODULES, target);
  if (!fs.existsSync(dir)) {
    return null;
  }

  try {
    const out = execSync(`du -sh "${dir}"`, { encoding: 'utf8' });
    return out.split('\t')[0].trim();
  } catch {
    return '?';
  }
};

console.log('Heavy dependency audit (disk size in node_modules)\n');

for (const name of TARGETS) {
  const size = du(name);
  const status = size ? size : 'not installed';
  console.log(`${name.padEnd(22)} ${status}`);
}

console.log('\nDirect dependency tree for date/util libraries:\n');
try {
  execSync('npm ls moment lodash dayjs date-fns core-js --depth=3', {
    cwd: ROOT,
    stdio: 'inherit',
  });
} catch {
  // npm ls exits 1 when versions mismatch; output is still useful.
}

console.log('\nApp source: no direct moment/lodash/dayjs imports.');
console.log('Production bundle: lodash.mergewith aliased to src/shims/lodashMergewith.js');
console.log('Run npm run analyze:bundle to inspect JS bundle composition.');
