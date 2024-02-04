import fs, { write } from 'fs';
import zlib from 'zlib';
import path from 'path';
import { printInConsole } from './console-messages.js';
import isFile from './isFile.js';
import isDirectory from './isDirectory.js';


export default async function compressFile(currentDirectory, inputFilePath, destinationPath) {
    let resolvedPathToFile = path.resolve(currentDirectory, inputFilePath);
    if (await isFile(inputFilePath)) {
        resolvedPathToFile = inputFilePath;
    }

    let resolvedDestinationPath = path.resolve(currentDirectory, destinationPath);
    if (await isDirectory(destinationPath)) {
        resolvedDestinationPath = destinationPath;
    }

    const resolvedDestinationFile = path.resolve(resolvedDestinationPath, path.basename(resolvedPathToFile) + '.br');

    if (await isFile(resolvedDestinationFile)) {
        printInConsole();
        return;
    }

    console.log(resolvedPathToFile);
    console.log(resolvedDestinationFile);

    try {
        const readStream = fs.createReadStream(resolvedPathToFile);
        const writeStream = fs.createWriteStream(resolvedDestinationFile);

        const brotliStream = zlib.createBrotliCompress();

        readStream.pipe(brotliStream).pipe(writeStream);

        const fileCompressed = new Promise((resolve, reject) => {

            writeStream.on('finish', () => {
                resolve();
            });

            writeStream.on('error', (error) => {
                reject(error);
            }
            );
        }
        );

        await fileCompressed;
        printInConsole(`File ${resolvedPathToFile} compressed to ${resolvedDestinationFile}`, 'yellow');

    } catch (error) {
        printInConsole();
    }
}
