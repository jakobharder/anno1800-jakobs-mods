const child_process = require('child_process');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

let bundles = {
  'jakob_new_world_cities': { 
    name: 'New-World-Cities',
    glob: [ '[Addon]*Cities*' ],
    version: '0'
  },
  'jakob_upgradable_low_tier': { 
    name: 'Terraced-Houses',
    glob: [ '[*Upgradable*', '[*Extra*', '[*Ground*', '[*Railway*', '[*Docklands*' ],
    version: '0'
  },
  'jakob_pescatarians': { 
    name: 'Pescatarians',
    glob: [ '[*Pescatarian*', '[*Extra*', '[*Ground*' ],
    version: '0'
  },
  'jakob_Biogas_Plant': { 
    name: 'Biogas-Production',
    glob: [ '[*Biogas*' ],
    version: '0'
  },
  'jakob_small_malls': { 
    name: 'Commercial-Street',
    glob: [ '[*Commercial*', '[*Ground*' ],
    version: '0'
  },
  'jakob_diagonal_residences': { 
    name: 'Diagonal-Residences',
    glob: [ '[*Diagonal*' ],
    version: '0'
  },
  'jakob_modular_factories': { 
    name: 'Modular-Factories',
    glob: [ '[*Modular*', '[*Ground*' ],
    version: '0'
  },
  'jakob_Nates_Windmill': { 
    name: 'Nates-Windmill',
    glob: [ '[*Windmill*' ],
    version: '0'
  },
  'jakob_everything_skin_pack': { 
    name: 'Everything-Skin-Pack',
    glob: [ '[Skin]*Variants*', '[Skin]*Residence*', '[*Town*' ]
  },
  'jakob_small_hotels': { 
    name: 'Small-Hotels',
    glob: [ '[*hotel*' ],
    version: '0'
  },
  'jakob_Small_Gas_Power_Plant': { 
    name: 'Small-Power-Plants',
    glob: [ '[*Power*' ],
    version: '0'
  },
  'jakob_alternative_needs': { 
    name: 'Alternative-Needs',
    glob: [ '[*Alternative*' ],
    version: '0'
  },
  'jakob_skin_electric_poles': { 
    name: 'Improved-Electric-Wires',
    glob: [ '[*Electric*' ],
    version: '0'
  },
  'jakob_street_skins': { 
    name: 'Improved-Streets',
    glob: [ '[*Street*' ],
    version: '0'
  },
  'jakob_compact_menus': { 
    name: 'Compact-Menus',
    glob: [ '[*Compact*' ],
    version: '0'
  }
};

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

  child_process.execFileSync('tar', [
      '-c', '-a',
      '-f', `out/${bundle.name}${version}.zip`,
      '-C', 'out/', ...bundle.glob
    ]);
}

// // rescan mods
// const modNames = glob.sync("./out/*/").map(e => path.basename(e));
// const packages = [... new Set(modNames.map(e => {
//   const dot = e.indexOf(',');
//   return (dot !== -1) ? e.substring(0, dot) + ',*' : e;
// }))];
// for (let package of packages) {
//   if (package.startsWith('-')) {
//     continue;
//   }
//   child_process.execFileSync('tar', [
//     '-c', '-a',
//     '-f', `out/${package.replace(/\s/g, '.').replace(',*', '')}.zip`,
//     '-C', 'out/', `${package}`
//   ])
// }
