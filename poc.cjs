const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, 'uploads', 'newsletter', 'private', 'template-1');

const env = nunjucks.configure(templateDir, {
  autoescape: false,
  noCache: true,
});

const html = env.render('template.njk', {
  sequence_number: 251,
});

const outputPath = path.join(__dirname, 'poc.html');
fs.writeFileSync(outputPath, html, 'utf-8');

console.log(`Template renderizado com sucesso em: ${outputPath}`);
