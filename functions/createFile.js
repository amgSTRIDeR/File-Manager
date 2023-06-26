import fs from 'fs';
import showMessage from './showMessage.js';

export default async function createFile(pathToFile) {
  if (fs.existsSync(pathToFile)) {
    showMessage();
    return;
  }

  try {
    await fs.promises.writeFile(pathToFile, '');
    showMessage('File created successfully', 'yellow');
  } catch (err) {
    showMessage();
  }
}
