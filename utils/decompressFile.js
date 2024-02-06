import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { printInConsole } from './console-messages.js';
import isFile from './isFile.js';
import isDirectory from './isDirectory.js';


export default async function decompressFile(currentDirectory, inputFilePath, destinationPath) {
    try {
        let resolvedPathToFile = path.resolve(currentDirectory, inputFilePath);
        if (await isFile(inputFilePath)) {
            resolvedPathToFile = inputFilePath;
        }

        let resolvedDestinationPath = path.resolve(currentDirectory, destinationPath);
        if (await isDirectory(destinationPath)) {
            resolvedDestinationPath = destinationPath;
        }

        const resolvedDestinationFile = path.resolve(resolvedDestinationPath, path.basename(resolvedPathToFile).slice(0, -3));

        if (await isFile(resolvedDestinationFile)) {
            printInConsole();
            return;
        }

        if (!(await isFile(resolvedPathToFile))) {
            printInConsole();
            return;
        }

        const readStream = fs.createReadStream(resolvedPathToFile);
        const writeStream = fs.createWriteStream(resolvedDestinationFile);

        const brotliStream = zlib.createBrotliDecompress();

        readStream.pipe(brotliStream).pipe(writeStream);

        const fileCompressed = new Promise((resolve, reject) => {

            writeStream.on('finish', () => {
                resolve();
            });

            writeStream.on('error', () => {
                reject();
            });
        });

        await fileCompressed;
        printInConsole(`File ${resolvedPathToFile} decompressed to ${resolvedDestinationFile}`, 'yellow');

    } catch {
        printInConsole();
    }
}
