import path from 'path';
import fs from 'fs';
import colors from '../common/colors.js';

function isDirectory(pathToCheck) {
  const stats = fs.statSync(pathToCheck);

  if (stats.isDirectory()) {
    return true;
  }

  return false;
}

export default function getDirectoryPath(dirPath, currentPath) {
  const relativePath = path.join(currentPath, dirPath);

  if (fs.existsSync(dirPath) && isDirectory(dirPath)) {
    return dirPath;
  } 
  
  if (fs.existsSync(relativePath) && isDirectory(relativePath)) {
    return relativePath;
  }

  console.log(`${colors.red}Operation failed${colors.reset}\n`);
  return currentPath;
}
