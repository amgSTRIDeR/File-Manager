import path from 'path';
import fs from 'fs';
import { printInConsole } from './console-messages.js';

export default async function createFile(currentPath, fileName) {
    const filePath = path.resolve(currentPath, fileName);


    try {
        await fs.promises.writeFile(filePath, '', { flag: 'wx' });
        printInConsole(`File ${fileName} created`, 'yellow');
    } catch (err) {
        printInConsole();
    }
}