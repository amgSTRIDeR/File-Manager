import fs from 'fs';
import path from 'path';
import isDirectory from './isDirectory.js';
import isFile from './isFile.js';

export default async function printContents(currentPath) {
  const contents = await fs.promises.readdir(currentPath);

  const directories = [];
  const files = [];

  for (const content of contents) {
    const contentPath = path.resolve(currentPath, content);

    if (!fs.existsSync(contentPath)) {
      continue;
    }

    if (isDirectory(contentPath)) {
      directories.push({ Name: content, Type: 'directory' });
    }

    if (isFile(contentPath)) {
      files.push({ Name: content, Type: 'file' });
    }
  }

  directories.sort((a, b) => a.Name.localeCompare(b.Name));
  files.sort((a, b) => a.Name.localeCompare(b.Name));

  const filesAndDirectories = directories.concat(files);
  console.table(filesAndDirectories);
}
