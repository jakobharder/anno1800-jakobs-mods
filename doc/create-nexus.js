const path = require('path');
const glob = require('glob');
const fs = require('fs');

const markdownReadme = fs.readFileSync('./README.md', 'utf-8');

let readme = markdownReadme;

// Remove ## Build and Modify Yourself
readme = readme.replace(/## Build and Modify[^#]+## /s, '## ');
// Remove ## Download from
readme = readme.replace(/## Download from[^#]+## /s, '## ');
// Remove # Jakob's
readme = readme.replace(/# Jakob's[^#]+## /s, '## ');

// Find lists
readme = readme.replace(/\n(- .+?)((?=\s+#)|(?=\s+\n\w))/gs, '\n[list]\r$1\r[/list]');

// ### Title
readme = readme.replace(/### (.+)\r/g, '\[size=4\]$1[/size]\r');
// ## Title
readme = readme.replace(/## (.+)\r/g, '\[size=5\]$1[/size]\r');
// # Title
readme = readme.replace(/# (.+)\r/g, '\[size=5\]$1[/size]\r');

// Relative links
readme = readme.replace(/\[(.+)\]\(\.(.+)\)/g, '\[url=https://github.com/jakobharder/anno-1800-jakobs-mods/blob/main$2\]$1[/url]');
// Absolute links
readme = readme.replace(/\[(.+)\]\((.+)\)/g, '\[url=$2\]$1[/url]');
// Image links
readme = readme.replace(/!\[\]\(\.(.+)\)/g, '\[img]https://github.com/jakobharder/anno-1800-jakobs-mods/raw/main$1[/img]');

// Bullet points
readme = readme.replace(/^- (.+)\r/gm, '\[*\] $1\r');

// Remove escapes
readme = readme.replace(/\\\[/g, '\[');
readme = readme.replace(/\\\]/g, '\]');

// Prepend header
readme = `[size=5]How to use[/size]

[list]
[*] Be sure either use [url=https://github.com/anno-mods/iModYourAnno/releases/latest]iModYourAnno Mod Manager[/url] or know [url=https://github.com/jakobharder/anno1800-mod-loader#mods]how to install mods manually[/url].
[*] Make sure you always have the latest version of the Anno Mod Loader installed. Mods won't show up after game updates otherwise.
[*] Alternative download: [url=https://github.com/jakobharder/anno-1800-jakobs-mods/releases]GitHub releases[/url]
[/list]

` + readme;

fs.writeFileSync('./doc/README.bbcode', readme);
