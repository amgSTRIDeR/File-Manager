import fs from "fs";
import isDirectory from './isDirectory.js';
import isFile from './isFile.js';
import { printInConsole } from "./console-messages.js";

function sortByName(a, b) {
    return a.Name.localeCompare(b.Name);
}

export default async function showList(currentDirectory) {
    try {
        const contents = await fs.promises.readdir(currentDirectory);

        const directories = [];
        const files = [];

        for (const content of contents) {
            const contentPath = `${currentDirectory}/${content}`;
            if (await isDirectory(contentPath)) {
                directories.push({ Name: content, Type: 'directory' });
            }

            if (await isFile(contentPath)) {
                files.push({ Name: content, Type: 'file' });
            }
        }

        directories.sort(sortByName);
        files.sort(sortByName);

        const allContents = directories.concat(files);

        console.table(allContents);

    } catch {
        printInConsole();
    }
}