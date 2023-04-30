const child_process = require('child_process');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const versions = [];
const mods = glob.sync("./out/*/").map(e => e.substr(0, e.length - 1));

mods.forEach(mod => {
  const modinfo = JSON.parse(fs.readFileSync(path.join(mod, 'modinfo.json')));
  versions.push(`${path.basename(mod).replace(/\[.+\] /, '')} ${modinfo.Version}`);

  if (bundles[modinfo.ModID]) {
    bundles[modinfo.ModID].version = modinfo.Version;
  }

  // allow without [] for bugfixes of legacy mods
  if (path.basename(mod).startsWith('[] ')) {
    fs.rmSync(mod.replace(/\[\] /, ''), { recursive: true, force: true });
    fs.renameSync(mod, mod.replace(/\[\] /, ''));
  }
});

fs.writeFileSync('./out/versions.md', versions.join('\n'));

for (const [modid, bundle] of Object.entries(bundles)) {
  const version = bundle.version ? `-${bundle.version}` : ``;

  console.log(`Package ${bundle.name}${version}.zip`);
  child_process.execFileSync('tar', [
      '-c', '-a',
      '-f', `out/${bundle.name}${version}.zip`,
      '-C', 'out/', ...bundle.glob
    ]);
}
