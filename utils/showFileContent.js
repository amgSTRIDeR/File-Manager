import { printInConsole } from "./console-messages.js";
import isFile from "./isFile.js";
import path from 'path';
import fs from 'fs';

export default async function showFileContent(currentPath, targetPath) {
    const filePath = path.resolve(currentPath, targetPath);
    const notFile = !(await isFile(filePath));

    if (notFile) {
        printInConsole();
        return;
    }
    try {
        const readable = fs.createReadStream(filePath, 'utf-8');
        const fileContentPromise = new Promise((resolve, reject) => {
            let fileContent = '';

            readable.on('data', (chunk) => {
                fileContent += chunk;
            });

            readable.on('end', () => {
                resolve(fileContent);
            });

            readable.on('error', (error) => {
                reject(error);
            });
        });

        const fileContent = await fileContentPromise;
        printInConsole(fileContent, 'yellow');
    } catch {
        printInConsole();
    }
}