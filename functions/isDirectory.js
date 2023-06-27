import fs from 'fs';

export default function isDirectory(pathToCheck) {
  const stats = fs.statSync(pathToCheck);

  if (stats.isDirectory()) {
    return true;
  }

  return false;
}