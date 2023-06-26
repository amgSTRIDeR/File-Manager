import fs from 'fs';

export default function isFile(pathToCheck) {
  const stats = fs.statSync(pathToCheck);

  if (stats.isFile()) {
    return true;
  }

  return false;
}