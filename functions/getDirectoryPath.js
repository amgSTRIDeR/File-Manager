import path from 'path';
import fs from 'fs';
import showMessage from './showMessage.js';
import isDirectory from './isDirectory.js';

export default function getDirectoryPath(dirPath, currentPath) {
  const relativePath = path.join(currentPath, dirPath);

  if (fs.existsSync(dirPath) && isDirectory(dirPath)) {
    return dirPath;
  } 
  
  if (fs.existsSync(relativePath) && isDirectory(relativePath)) {
    return relativePath;
  }

  showMessage();
  return currentPath;
}
