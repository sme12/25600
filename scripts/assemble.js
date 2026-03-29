/* eslint-disable no-undef */
import {
  cpSync,
  rmSync,
  mkdirSync,
  readdirSync,
  statSync,
  existsSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'dist');

// Clean previous assembly
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// Find workspace dirs that have a dist/ folder
const entries = readdirSync(root).filter((name) => {
  try {
    return statSync(join(root, name, 'dist')).isDirectory();
  } catch {
    return false;
  }
});

for (const name of entries) {
  cpSync(join(root, name, 'dist'), join(outDir, name), { recursive: true });
  console.info(`  assembled: ${name}/dist -> dist/${name}/`);
}

// Copy root public/ files (e.g. index.html) into dist/
const publicDir = join(root, 'public');
if (existsSync(publicDir)) {
  cpSync(publicDir, outDir, { recursive: true });
  console.info('  assembled: public/ -> dist/');
}

console.info(`\nassembly complete: ${entries.length} project(s)`);
