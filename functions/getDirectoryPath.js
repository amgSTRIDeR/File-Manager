import path from 'path';
import fs from 'fs';
import colors from '../common/colors.js';
import isDirectory from './isDirectory.js';

export default function getDirectoryPath(dirPath, currentPath) {
  console.log(dirPath)
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
