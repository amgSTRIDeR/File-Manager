import colors from './common/colors.js';
import getUserName from './functions/getUserName.js';
import greetUser from './functions/greetUser.js';
import sayGoodbye from './functions/sayGoodbye.js';
import os from 'os';
import getUpperDirectory from './functions/getUpperDirectory.js';
import getDirectoryPath from './functions/getDirectoryPath.js';
import printContents from './functions/printContents.js';
import readSelectedFile from './functions/readSelectedFile.js';
import path from 'path';
import createFile from './functions/createFile.js';
import renameFile from './functions/renameFile.js';

const userName = getUserName();
let currentPath = os.homedir();

greetUser(userName, currentPath);

process.stdin.setEncoding('utf8');

process.stdin.on('data', async (data) => {
  switch (data.trim().split(' ')[0]) {
    case '.exit':
      sayGoodbye(userName);
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
        const oldPathToFile = path.join(currentPath, data.substring(3).split(' ')[0]).trim();
        const newPathToFile = path.join(currentPath, data.substring(3).split(' ')[1]).trim();
        await renameFile(oldPathToFile, newPathToFile);
        break;
    default:
      console.log(`${colors.red}Invalid input${colors.reset}\n`);
  }

  console.log(
    `${colors.green}You are currently in ${currentPath}${colors.reset}`
  );
});

process.on('SIGINT', () => {
  sayGoodbye(userName);
  process.exit();
});
