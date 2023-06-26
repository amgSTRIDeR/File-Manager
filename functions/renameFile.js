import fs from 'fs';
import showMessage from './showMessage.js';

export default async function createFile(oldPathToFile, newPathToFile) {
  if (!fs.existsSync(oldPathToFile) || fs.existsSync(newPathToFile)) {
    showMessage();
    return;
  }

  try {
    await fs.promises.rename(oldPathToFile, newPathToFile);
    showMessage('File renamed successfully', 'yellow');
  } catch (err) {
    showMessage();
  }
}
