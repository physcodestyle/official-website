const fs = require('fs');
const ttf2woff2 = require('ttf2woff2');

const fontSet = {
  'Fira_Sans': [
    'Bold',
    'Light'
  ],
  'Open_Sans': [
    'Bold',
    'Italic',
    'Regular'
  ]
};

const glyphSet = [
  'Cyrillic',
  'Latin',
  'LatinExtended'
];

const dir1 = './dist';
const dir2 = './dist/fonts';

if (!fs.existsSync(dir2)){
    fs.mkdirSync(dir1);
    fs.mkdirSync(dir2);
}

const fontNames = Object.keys(fontSet);
for (font of fontNames) {
  for (style of fontSet[font]) {
    for (glyph of glyphSet) {
      const file = fs.readFileSync(`./src/fonts/${font}/${font.replace('_', '')}-${style}-${glyph}.ttf`);
      fs.writeFileSync(`./dist/fonts/${font.replace('_', '')}-${style}-${glyph}.woff2`, ttf2woff2(file));
    }
  }
}
