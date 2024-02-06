import path from 'path';

export default function getUpperDirectory(currentPath) {
    const upperDirectory = path.resolve(currentPath, '..');
    return upperDirectory;
}