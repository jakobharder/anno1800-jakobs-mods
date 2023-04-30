const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const changed = child_process.execSync('git diff --name-only origin/main HEAD').toString().split('\n').map(e => e.trim());

function getModName(changedPath) {
  split = changedPath.split("/");
  if (split.length > 1) {
    return path.join(split[0], split[1]);
  }
  return undefined;
}

const folders = [...new Set(changed.map(e => getModName(e)).filter(e => e !== undefined && fs.existsSync(path.join(e, "modinfo.json"))))];
if (folders.length === 0 || !folders[0]) {
  return;
}
else if (folders.length === 1) {
  console.log(`${folders[0]}/modinfo.json`);
  return;
}
console.log(`{${folders.join(',')}}/modinfo.json`);
