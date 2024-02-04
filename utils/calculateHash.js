import isFile from "./isFile.js";
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { printInConsole } from './console-messages.js';

export default async function calculateHash(currentDirectory, pathToFile) {
    try {

        const normalizedFilePath = path.normalize(pathToFile);
        let resolvedPathToFile = path.resolve(currentDirectory, normalizedFilePath);
        if (await isFile(normalizedFilePath)) {
            resolvedPathToFile = normalizedFilePath;
        }

        const readStream = fs.createReadStream(resolvedPathToFile);
        const hash = crypto.createHash('sha256');
        const hashPromise = new Promise((resolve, reject) => {
            readStream.on('data', (chunk) => {
                hash.update(chunk);
            });
            readStream.on('end', () => {
                resolve(hash.digest('hex'));
            });
            readStream.on('error', (error) => {
                reject(error);
            });

        });

        const fileHash = await hashPromise;

        printInConsole(`File hash is: ${fileHash}`, 'yellow');
    } catch {
        printInConsole();
    }

}

