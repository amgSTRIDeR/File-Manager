import isFile from "./isFile.js";
import path from 'path';
import { printInConsole } from './console-messages.js';
import fs from 'fs';
import isDirectory from "./isDirectory.js";

export default async function copyFile(currentDirectory, pathToFile, destinationDirectory, options = {deleteSource: false}) {
    try {
        const normalizedFilePath = path.normalize(pathToFile);
        let resolvedPathToFile = path.resolve(currentDirectory, normalizedFilePath);
        if (await isFile(normalizedFilePath)) {
            resolvedPathToFile = normalizedFilePath;
        }

        const normalizedDirectoryPath = path.normalize(destinationDirectory);
        const parsedFilePath = path.parse(resolvedPathToFile);
        const destinationFilePath = path.resolve(normalizedDirectoryPath, parsedFilePath.base);

        const isOriginalFileExist = await isFile(resolvedPathToFile);
        const isDirectoryExist = await isDirectory(normalizedDirectoryPath);
        const isDestinationFileExist = await isFile(destinationFilePath);
        if (!isOriginalFileExist || !isDirectoryExist || isDestinationFileExist) {
            printInConsole();
            return;
        }

        const readStream = fs.createReadStream(resolvedPathToFile);
        const writeStream = fs.createWriteStream(destinationFilePath);

        readStream.pipe(writeStream);

        readStream.on('end', () => {
            if (options.deleteSource) {
                fs.promises.unlink(resolvedPathToFile);
            }
            printInConsole(`File ${parsedFilePath.base} copied to ${destinationDirectory}`, 'yellow');
        })
    } catch {
        printInConsole();
    }
}