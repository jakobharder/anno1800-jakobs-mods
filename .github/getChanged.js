const child_process = require('child_process');

const changed = child_process.execSync('git diff --name-only origin/main HEAD').toString().split('\n').map(e => e.trim());

const folders = [...new Set(changed.filter(e => e.indexOf('/') !== -1).map(e => e.substring(0, e.indexOf('/'))))];
if (folders.length === 0 || !folders[0]) {
  return;
}
else if (folders.length === 1) {
  console.log(`${folders[0]}/**/annomod.json`);
  return;
}
console.log(`{${folders.join(',')}}/**/annomod.json`);
