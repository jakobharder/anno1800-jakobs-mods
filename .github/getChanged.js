const child_process = require('child_process');

const changed = child_process.execSync('git diff --name-only origin/main HEAD').toString().split('\n').map(e => e.trim());

const folders = [...new Set(changed.filter(e => e.indexOf('/') !== -1).map(e => e.substring(0, e.indexOf('/'))))];
console.log('{' + folders.join(',') + '}/**/annomod.json');

// const hasWorkflowChange = changed.indexOf('.github/') !== -1 || changed.indexOf('package.json') !== -1;

// let glob;
// if (hasWorkflowChange) {
//   glob = '**/annomod.json';
// }
// else {
//   const folders = [...new Set(changed.filter(e => e.indexOf('/') !== -1).map(e => e.substring(0, e.indexOf('/'))))];
//   glob = '{' + folders.join(',') + '}/**/annomod.json';
// }

// console.log(glob);
