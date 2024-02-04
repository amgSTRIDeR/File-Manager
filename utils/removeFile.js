import isFile from "./isFile.js";
import path from 'path';
import fs from 'fs';
import { printInConsole } from './console-messages.js';

export default async function removeFile(currentDirectory, pathToFile) {
    let resolvedPathToFile = path.resolve(currentDirectory, pathToFile);
    if (await isFile(pathToFile)) {
        resolvedPathToFile = pathToFile;
    }

    console.log(resolvedPathToFile);

    try {
        await fs.promises.unlink(resolvedPathToFile);
        printInConsole(`File ${pathToFile} removed`, 'yellow');
    } catch {
        printInConsole();
    }

}
