import fs from 'fs';
import os from 'os';
import path from 'path';

const cacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(os.homedir(), '.cache', 'puppeteer');
const chromeDir = path.join(cacheDir, 'chrome');

const builds = fs.existsSync(chromeDir)
  ? fs.readdirSync(chromeDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

if (builds.length > 1) {
  console.warn(`\n${builds.length} Chrome builds cached in ${chromeDir}:`);
  builds.forEach((build) => console.warn(`  - ${build}`));
  console.warn('After restarting the app, run "npm run clean-browsers" to remove the old ones.\n');
}
