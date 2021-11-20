const child_process = require('child_process');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const versions = [];
const mods = glob.sync("./out/*/").map(e => e.substr(0, e.length - 1));

mods.forEach(mod => {
  const modinfo = JSON.parse(fs.readFileSync(path.join(mod, 'modinfo.json')));
  versions.push(`${path.basename(mod).replace(/\[.+\] /, '')} ${modinfo.Version}`);
});

fs.writeFileSync('./out/versions.md', versions.join('\n'));

const packages = [... new Set(mods.map(e => {
  const dot = e.indexOf(',');
  return (dot !== -1) ? e.substring(0, dot) + ',*' : e;
}))];

for (let package of packages) {
  child_process.execFileSync('tar', [
    '-c', '-a',
    '-f', `out/${path.basename(package).replace(/\s/g, '.').replace(',*', '')}.zip`,
    '-C', 'out/', `${path.basename(package)}`
  ])
}
