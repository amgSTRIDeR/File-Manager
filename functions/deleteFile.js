import fs from 'fs';
import showMessage from './showMessage.js';

export default async function deleteFile(fileToDeletePath) {
  if (!fs.existsSync(fileToDeletePath)) {
    showMessage();
    return;
  }

  try {
    await fs.promises.unlink(fileToDeletePath);
    showMessage('File deleted successfully', 'yellow');
  } catch (err) {
    showMessage();
  }
}
