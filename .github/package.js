const child_process = require('child_process');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const versions = [];
const mods = glob.sync("./out/*/").map(e => e.substr(0, e.length - 1));

mods.forEach(mod => {
  const modinfo = JSON.parse(fs.readFileSync(path.join(mod, 'modinfo.json')));
  versions.push(`${path.basename(mod).replace(/\[.+\] /, '')} ${modinfo.Version}`);

  // allow without [] for bugfixes of legacy mods
  if (path.basename(mod).startsWith('[] ')) {
    fs.rmSync(mod.replace(/\[\] /, ''), { recursive: true, force: true });
    fs.renameSync(mod, mod.replace(/\[\] /, ''));
  }
});

fs.writeFileSync('./out/versions.md', versions.join('\n'));

// rescan mods
const modNames = glob.sync("./out/*/").map(e => path.basename(e));
const packages = [... new Set(modNames.map(e => {
  const dot = e.indexOf(',');
  return (dot !== -1) ? e.substring(0, dot) + ',*' : e;
}))];

for (let package of packages) {
  if (package.startsWith('-')) {
    continue;
  }
  child_process.execFileSync('tar', [
    '-c', '-a',
    '-f', `out/${package.replace(/\s/g, '.').replace(',*', '')}.zip`,
    '-C', 'out/', `${package}`
  ])
}
