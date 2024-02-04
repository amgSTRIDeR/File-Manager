import fs from 'fs';
import { printInConsole } from './console-messages.js';
import isFile from './isFile.js';
import path from 'path';

export default async function renameFile(currentDirectory, pathToFile, newFilename) {
    const normalizedPathToFile = path.normalize(pathToFile);
    const isPathCorrect = await isFile(normalizedPathToFile);
    let pathToFileResolved = path.resolve(currentDirectory, pathToFile);

    if (isPathCorrect) {
        pathToFileResolved = pathToFile;
    }

    const parsedPath = path.parse(pathToFileResolved);
    parsedPath.base = newFilename;
    const pathToRenamedFile = path.format(parsedPath);

    try {
        await fs.promises.rename(pathToFileResolved, pathToRenamedFile);
        printInConsole(`File ${pathToFile} renamed to ${newFilename}`, 'yellow') 
    } catch (err) {
        printInConsole();
    }
}