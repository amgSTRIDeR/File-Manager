import getUserName from './functions/getUserName.js';
import greetUser from './functions/greetUser.js';
import os from 'os';
import getUpperDirectory from './functions/getUpperDirectory.js';
import getDirectoryPath from './functions/getDirectoryPath.js';
import printContents from './functions/printContents.js';
import readSelectedFile from './functions/readSelectedFile.js';
import path from 'path';
import createFile from './functions/createFile.js';
import renameFile from './functions/renameFile.js';
import showMessage from './functions/showMessage.js';

const userName = getUserName();
let currentPath = os.homedir();

greetUser(userName, currentPath);

process.stdin.setEncoding('utf8');

process.stdin.on('data', async (data) => {
  switch (data.trim().split(' ')[0]) {
    case '.exit':
      showMessage(`Thank you for using File Manager, ${userName}, goodbye!`, 'cyan');
      process.exit();
    case 'up':
      currentPath = getUpperDirectory(currentPath);
      break;
    case 'cd':
      const dirPath = data.substring(3).trim() || '';
      currentPath = getDirectoryPath(dirPath, currentPath);
      break;
    case 'ls':
      await printContents(currentPath);
      break;
    case 'cat':
      const fileToReadPath = path.join(currentPath, data.substring(4)).trim();
      await readSelectedFile(fileToReadPath);
      break;
    case 'add':
      const fileToCreatePath = path.join(currentPath, data.substring(4)).trim();
      await createFile(fileToCreatePath);
      break;
      case 'rn':
        const args = data.substring(3).split(' ');
        const oldPathToFile = path.join(currentPath, args[0]).trim();
        const newPathToFile = path.join(currentPath, args[1]).trim();
        await renameFile(oldPathToFile, newPathToFile);
        break;
    default:
      showMessage('Invalid input', 'red');
  }

  showMessage(`You are currently in ${currentPath}`, 'green');
});

process.on('SIGINT', () => {
  sayGoodbye(userName);
  process.exit();
});
