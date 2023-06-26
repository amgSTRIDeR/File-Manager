import isFile from './isFile.js';
import fs from 'fs';
import colors from '../common/colors.js';

export default async function readSelectedFile(pathToFile) {
  if (!fs.existsSync(pathToFile) || !isFile(pathToFile)) {
    console.log(`${colors.red}Operation failed${colors.reset}\n`);
    return;
  }

  const readStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });

  readStream.on('data', (chunk) => {
    console.log(chunk);
  });
}
