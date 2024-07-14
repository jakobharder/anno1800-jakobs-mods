const child_process = require('child_process');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

function readMeta(filePath) {
  const modinfo = JSON.parse(fs.readFileSync(filePath));
  return {
    name: modinfo.ModName.English.replace(' (Jakob)', '').replace(/ /g, '-').replace(',', '').replace('\'', ''),
    // folder: `[${modinfo.Category.English}] ${modinfo.ModName.English}`,
    path: path.dirname(filePath),
    version: modinfo.Version,
    id: modinfo.ModID,
    dependencies: modinfo.ModDependencies
  }
}

function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

const idsToPackage = [
  "jakob-city-variations",
  "jakob_new_world_cities",
  "jakob_industrial_cities",
  "jakob_Biogas_Plant",
  "jakob_diagonal_residences",
  "jakob_Nates_Windmill",
  "jakob_street_skins",
  "jakob_compact_menus",
  "disable-fertilities-jakob",
  "disable-street-jakob",
  "disable-railway-jakob"
];

const modsToPackage = glob.sync("./out/*/modinfo.json")
  .map(e => readMeta(e))
  .filter(e => idsToPackage.indexOf(e.id) >= 0);

for (mod of modsToPackage) {
  console.log(`Package ${mod.name}-${mod.version}.zip`);

  child_process.execSync(
    `tar -ca -f ${path.join(process.cwd(), `out/${mod.name}-${mod.version}.zip`)} -C ${path.join(process.cwd(), path.dirname(mod.path))} "${path.basename(mod.path)}"`);
}
