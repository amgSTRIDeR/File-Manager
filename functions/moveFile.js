import fs from 'fs';
import showMessage from './showMessage.js';
import path from 'path';

export default async function moveFile(fileToMovePath, destinationPath) {
  const destinationFilePath = path.join(
    destinationPath,
    path.basename(fileToMovePath)
  );

  if (!fs.existsSync(fileToMovePath) || fs.existsSync(destinationFilePath)) {
    showMessage();
    return;
  }

  const readStream = fs.createReadStream(fileToMovePath);
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

  writeStream.on('finish', async () => {
    try {
      await fs.promises.unlink(fileToMovePath);
      showMessage('File moved successfully', 'yellow');
    } catch (err) {
      showMessage();
    }
  });

  writeStream.on('error', (err) => {
    showMessage();
  });

  readStream.pipe(writeStream);
}
