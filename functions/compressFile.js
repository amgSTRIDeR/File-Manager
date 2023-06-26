import fs from 'fs';
import showMessage from './showMessage.js';
import zlib from 'zlib';
import path from 'path';
import isFile from './isFile.js';

export default async function compressFile(pathToFile, destinationPath) {
  const destinationFilePath = path.resolve(
    destinationPath,
    `${path.parse(pathToFile).name}.br`
  );
  if (
    !fs.existsSync(pathToFile) ||
    !isFile(pathToFile) ||
    fs.existsSync(destinationFilePath)
  ) {
    showMessage();
    return;
  }

  const readStream = fs.createReadStream(pathToFile);
  const writeStream = fs.createWriteStream(destinationFilePath);

  const brotliStream = zlib.createBrotliCompress();

  readStream.pipe(brotliStream).pipe(writeStream);

  writeStream.on('finish', () => {
    showMessage('File compressed successfully', 'yellow');
  });

  writeStream.on('error', (err) => {
    showMessage();
  });
}
