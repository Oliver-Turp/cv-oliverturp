import fs from 'fs';
import os from 'os';
import path from 'path';
import { executablePath } from 'puppeteer';

const cacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(os.homedir(), '.cache', 'puppeteer');
const chromeDir = path.join(cacheDir, 'chrome');
const prune = process.argv.includes('--prune');

const builds = fs.existsSync(chromeDir)
  ? fs.readdirSync(chromeDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];
const currentBuild = path.relative(chromeDir, await executablePath()).split(path.sep)[0];
const oldBuilds = builds.filter((build) => build !== currentBuild);

if (prune) {
  if (!builds.includes(currentBuild)) {
    console.error(`Current Chrome build not found in ${chromeDir}, nothing removed. Run "npm run build" first.`);
    process.exit(1);
  }
  oldBuilds.forEach((build) => {
    fs.rmSync(path.join(chromeDir, build), { recursive: true, force: true });
    console.log(`Removed ${build}`);
  });
  if (oldBuilds.length === 0) console.log('No old Chrome builds to remove.');
} else if (oldBuilds.length > 0) {
  console.warn(`\n${oldBuilds.length} old Chrome build(s) cached in ${chromeDir}:`);
  oldBuilds.forEach((build) => console.warn(`  - ${build}`));
  console.warn(`Current build: ${currentBuild}`);
  console.warn('After restarting the app, run "npm run clean-browsers" to remove the old ones.\n');
}
