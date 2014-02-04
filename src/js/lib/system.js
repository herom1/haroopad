var fs = require('fs'),
  path = require('path'),
  gui = require('nw.gui'),
  readDir;

/* node-webkit gui */
global.Shell = gui.Shell;
global.Clipboard = gui.Clipboard;
global.App = gui.App;
global.Manifest = gui.App.manifest;

// prevent memory leak detect
process.setMaxListeners(0);

switch (process.platform) {
  case 'win32':
    global.EXECPATH = path.join(process.execPath, '../');
    break;
  case 'darwin':
    global.EXECPATH = path.join(process.execPath, '../../../../../');
    break;
  case 'linux':
    global.EXECPATH = path.join(process.execPath, '../');
    break;
}

/* system path */
global.PATHS = {
  node_modules: path.join(global.EXECPATH, 'Libraries', '.node_modules'),
  locales: path.join(global.EXECPATH, 'Libraries', '.locales'),
  docs: path.join(global.EXECPATH, 'Libraries', '.docs'),
  css_code: path.join(global.EXECPATH, 'Libraries', '.css', 'code'),
  js: path.join(global.EXECPATH, 'Libraries', '.js'),
  theme_res_editor: path.join(global.EXECPATH, 'Resources', 'Themes', 'editor'),
  theme_res_viewer: path.join(global.EXECPATH, 'Resources', 'Themes', 'viewer'),
  theme_dest_editor: path.join(global.App.dataPath, 'Themes', 'editor'),
  theme_dest_viewer: path.join(global.App.dataPath, 'Themes', 'viewer')
};

//add node main module path
process.mainModule.paths = [global.PATHS.node_modules];

/* load locales */
global.LANGS = fs.readFileSync(path.join(global.PATHS.locales, 'locales.json'));
global.LANGS = JSON.parse(global.LANGS);

readDir = require('readdir');

function loadCSSFiles(dir) {
  var csses = readDir.readSync(dir, ['*.css'], readDir.CASELESS_SORT);
  var name, themes = {};

  csses.forEach(function(css, idx) {
    name = path.basename(css).replace('.css', '');
    themes[name] = {
      id: idx,
      name: name,
      path: css
    }
  });

  return themes;
}

/* native themes */
global.THEMES = {};
global.THEMES.editor = ['default', '3024-day', '3024-night', 'ambiance-mobile', 'ambiance',
  'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant', 'erlang-dark',
  'lesser-dark', 'mbo', 'midnight', 'monokai', 'neat', 'night', 'paraiso-dark', 'paraiso-light',
  'pastel-on-dark', 'rubyblue', 'solarized dark', 'solarized light', 'the-matrix',
  'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'
];
global.THEMES.viewer = ['clearness', 'clearness-dark', 'node-dark', 'github', 'haroopad',
  'solarized-dark', 'solarized-light', 'metro-vibes', 'metro-vibes-dark', 'wood', 'wood-ri'
];
global.THEMES.code = ['default', 'arta', 'ascetic', 'atelier-dune.dark', 'atelier-dune.light',
  'atelier-forest.dark', 'atelier-forest.light', 'atelier-heath.dark', 'atelier-heath.light',
  'atelier-lakeside.dark', 'atelier-lakeside.light', 'atelier-seaside.dark', 'atelier-seaside.dark',
  'brown_paper', 'brown_papersq', 'docco', 'far', 'foundation', 'github', 'googlecode', 'idea',
  'ir_black', 'magula', 'mono-blue', 'monokai_sublime', 'obsidian', 'paraiso.dark', 'paraiso.light',
  'pojoaque', 'railscasts', 'rainbow', 'school_book', 'solarized_dark', 'solarized_light', 'sunburst',
  'tomorrow-night-blue', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'tomorrow-night',
  'tomorrow', 'vs', 'xcode', 'zenburn'
];