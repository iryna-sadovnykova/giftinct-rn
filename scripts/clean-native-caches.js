#!/usr/bin/env node
/**
 * Removes Android Gradle/C++ build outputs from inside node_modules.
 * These are created during local Android builds and can grow to several GB.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'node_modules');

const TARGETS = [
  'react-native-reanimated/android/.cxx',
  'react-native-reanimated/android/build',
  'react-native-worklets/android/.cxx',
  'react-native-worklets/android/build',
  'react-native-gesture-handler/android/.cxx',
  'react-native-gesture-handler/android/build',
  'react-native-screens/android/.cxx',
  'react-native-screens/android/build',
  'react-native-safe-area-context/android/.cxx',
  'react-native-safe-area-context/android/build',
];

const removeDir = dir => {
  if (!fs.existsSync(dir)) {
    return 0;
  }

  fs.rmSync(dir, { recursive: true, force: true });
  return 1;
};

let removed = 0;

for (const relativePath of TARGETS) {
  const absolutePath = path.join(ROOT, relativePath);
  removed += removeDir(absolutePath);
}

if (removed > 0) {
  console.log(`Removed ${removed} native build cache folder(s) from node_modules.`);
} else {
  console.log('No native build cache folders found in node_modules.');
}
