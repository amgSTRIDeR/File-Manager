import fs from 'fs';
import showMessage from './showMessage.js';
import path from 'path';

export default async function copyFile(fileToCopyPath, destinationPath) {
  const destinationFilePath = path.join(destinationPath, path.basename(fileToCopyPath));

  if (!fs.existsSync(fileToCopyPath) || fs.existsSync(destinationFilePath)) {
    showMessage();
    return;
  }
  
  const readStream = fs.createReadStream(fileToCopyPath);
  const writeStream = fs.createWriteStream(destinationFilePath);

  readStream.on('data', (chunk) => {
    writeStream.write(chunk);
  });
  
  readStream.on('end', () => {
    writeStream.end();
  });
  
  readStream.on('error', (err) => {
   showMessage();
  });
  
  writeStream.on('finish', () => {
    showMessage('File copied successfully', 'yellow');
  });
  
  writeStream.on('error', (err) => {
    showMessage();
  });
  
  readStream.pipe(writeStream);
}
