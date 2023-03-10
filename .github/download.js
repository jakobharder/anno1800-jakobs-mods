const child_process = require('child_process');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const packageJson = require('../package.json');

for (const [id, download] of Object.entries(packageJson.downloads)) {

  if (!fs.existsSync('./download')) {
    fs.mkdirSync('./download');
  }

  const zipPath = './download/' + path.basename(download);
  if (fs.existsSync(zipPath)) {
    console.log(`${path.basename(download)} already downloaded`);
    continue;
  }

  console.log(`Download ${path.basename(download)} from ${download}`);
  child_process.execFileSync('curl', [
    '-L',
    '-o', zipPath,
    download
  ]);
}
