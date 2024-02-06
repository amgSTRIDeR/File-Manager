import fs from 'fs';

export default async function isDirectory(path) {
    try {
        const pathStat = await fs.promises.stat(path);
        return pathStat.isDirectory();
    } catch {
        return false;
    }
}