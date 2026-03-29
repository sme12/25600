/* eslint-disable no-undef */
import { cpSync, rmSync, mkdirSync, readdirSync, statSync } from 'node:fs';
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

console.info(`\nassembly complete: ${entries.length} project(s)`);
