import isFile from "./isFile.js";
import path from 'path';
import { printInConsole } from './console-messages.js';
import fs from 'fs';
import isDirectory from "./isDirectory.js";

export default async function copyFile(filePath, directoryPath, options = {deleteSource: false}) {
    try {
        const normalizedFilePath = path.normalize(filePath);
        const normalizedDirectoryPath = path.normalize(directoryPath);
        const parsedFilePath = path.parse(normalizedFilePath);
        const destinationFilePath = path.resolve(normalizedDirectoryPath, parsedFilePath.base);

        const isOriginalFileExist = await isFile(normalizedFilePath);
        const isDirectoryExist = await isDirectory(normalizedDirectoryPath);
        const isDestinationFileExist = await isFile(destinationFilePath);
        if (!isOriginalFileExist || !isDirectoryExist || isDestinationFileExist) {
            printInConsole();
            return;
        }

        const readStream = fs.createReadStream(normalizedFilePath);
        const writeStream = fs.createWriteStream(destinationFilePath);

        readStream.pipe(writeStream);

        readStream.on('end', () => {
            if (options.deleteSource) {
                fs.unlink(normalizedFilePath, (err) => {
                    if (err) {
                        printInConsole();
                    }
                });
            }
            printInConsole(`File ${parsedFilePath.base} copied to ${directoryPath}`, 'yellow');
        })
    } catch {
        printInConsole();
    }
}