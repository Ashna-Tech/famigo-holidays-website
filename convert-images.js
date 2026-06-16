const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './public/images';

fs.readdirSync(inputFolder).forEach(file => {
  const ext = path.extname(file).toLowerCase();

  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const inputPath = path.join(inputFolder, file);

    const outputPath = path.join(
      inputFolder,
      path.basename(file, ext) + '.webp'
    );

    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ ${file} → ${path.basename(outputPath)}`);
      })
      .catch(err => {
        console.error(`❌ Error: ${file}`, err);
      });
  }
});