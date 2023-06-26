import isFile from './isFile.js';
import fs from 'fs';
import showMessage from './showMessage.js';

export default async function readSelectedFile(pathToFile) {
  try {
    if (!fs.existsSync(pathToFile) || !isFile(pathToFile)) {
      showMessage();
      return;
    }

    const readStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });

    readStream.on('data', (chunk) => {
      console.log(chunk);
    });

    readStream.on('error', (err) => {
      showMessage();
    });
  } catch (err) {
    showMessage();
  }
}
