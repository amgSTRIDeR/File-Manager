import fs from 'fs';
import showMessage from './showMessage.js';
import crypto from 'crypto';
import isFile from './isFile.js';

export default async function getHash(pathToFile) {
  if (!fs.existsSync(pathToFile) || !isFile(pathToFile)) {
    showMessage();
    return;
  }

  const hash = crypto.createHash('sha256');

  try {
    const fileData = await fs.promises.readFile(pathToFile);
    hash.update(fileData);
    showMessage(`SHA256 hash of the file is: ${hash.digest('hex')}`, 'yellow');
  } catch (err) {
    showMessage();
  }
}
