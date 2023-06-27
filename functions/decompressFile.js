import fs from 'fs';
import showMessage from './showMessage.js';
import zlib from 'zlib';
import path from 'path';
import isFile from './isFile.js';

export default async function decompressFile(pathToFile, destinationPath) {
  const destinationFilePath = path.resolve(
    destinationPath,
    `${path.basename(pathToFile).slice(0, -3)}`
  );

  if (
    !fs.existsSync(pathToFile) ||
    !isFile(pathToFile) ||
    !fs.existsSync(destinationPath) ||
    fs.existsSync(destinationFilePath)
  ) {
    showMessage();
    return;
  }

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(destinationFilePath);

  const brotliStream = zlib.createBrotliDecompress();

  readStream.pipe(brotliStream).pipe(writeStream);

  writeStream.on('finish', () => {
    showMessage('File decompressed successfully', 'yellow');
  });

  writeStream.on('error', (err) => {
    showMessage();
  });
}
