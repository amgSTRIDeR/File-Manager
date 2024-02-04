import fs from 'fs';

export default async function isFile(path) {
    try {
        const pathStat = await fs.promises.stat(path);
        return pathStat.isFile();
    } catch {
        return false;
    }
}