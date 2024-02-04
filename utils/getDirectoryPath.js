import path from 'path';
import isDirectory from './isDirectory.js';
import { printInConsole } from './console-messages.js';

export default async function getDirectoryPath(currentPath, targetPath) {
    try {
        const targetPathIsDirectory = await isDirectory(targetPath);

        if (targetPathIsDirectory) {
            return targetPath;
        }

        const resolvedPath = path.resolve(currentPath, targetPath);
        const resolvedPathIsDirectory = await isDirectory(resolvedPath);

        if (resolvedPathIsDirectory) {
            return resolvedPath;
        }

        printInConsole();
        return currentPath;
    } catch {
        printInConsole();
        return currentPath;
    }
}