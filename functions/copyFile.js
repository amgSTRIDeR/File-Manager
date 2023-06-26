import fs from 'fs';
import showMessage from './showMessage.js';

export default async function copyFile(fileToCopyPath, destinationPath) {
  if (!fs.existsSync(fileToCopyPath) || fs.existsSync(destinationPath)) {
    showMessage();
    return;
  }
  
  const readStream = fs.createReadStream(fileToCopyPath);
  const writeStream = fs.createWriteStream(destinationPath);

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
