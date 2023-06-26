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
import copyFile from './functions/copyFile.js';
import sayGoodbye from './functions/sayGoodbye.js';
import moveFile from './functions/moveFile.js';
import deleteFile from './functions/deleteFile.js';
import osActions from './functions/osActions.js';
import getHash from './functions/getHash.js';

const userName = getUserName();
let currentPath = os.homedir();

greetUser(userName, currentPath);

process.stdin.setEncoding('utf8');

process.stdin.on('data', async (data) => {
  const command = data.trim().split(' ')[0].trim();
  const firstArg = data.trim().split(' ')[1]?.trim() || '';
  const secondArg = data.trim().split(' ')[2]?.trim() || '';
  const firstArgPath = path.resolve(currentPath, firstArg).trim() || '';
  const secondArgPath = path.resolve(currentPath, secondArg).trim() || '';

  switch (command) {
    case 'up':
      currentPath = getUpperDirectory(currentPath);
      break;

    case 'cd':
      if (!firstArg) {
        showMessage('Invalid input', 'red');
        break;
      }

      currentPath = getDirectoryPath(firstArgPath, currentPath);
      break;

    case 'ls':
      await printContents(currentPath);
      break;

    case 'cat':
      if (!firstArg) {
        showMessage('Invalid input', 'red');
        break;
      }

      await readSelectedFile(firstArgPath);
      break;

    case 'add':
      if (!firstArg) {
        showMessage('Invalid input', 'red');
        break;
      }

      await createFile(firstArgPath);
      break;

    case 'rn':
      if (!firstArg || !secondArg) {
        showMessage('Invalid input', 'red');
        break;
      }

      await renameFile(firstArgPath, secondArgPath);
      break;

    case 'cp':
      if (!firstArg || !secondArg) {
        showMessage('Invalid input', 'red');
        break;
      }
      await copyFile(firstArgPath, secondArgPath);
      break;

    case 'mv':
      if (!firstArg || !secondArg) {
        showMessage('Invalid input', 'red');
        break;
      }
      await moveFile(firstArgPath, secondArgPath);
      break;

    case 'rm':
      if (!firstArg) {
        showMessage('Invalid input', 'red');
        break;
      }
      await deleteFile(firstArgPath);
      break;

    case 'os':
      if (!firstArg) {
        showMessage('Invalid input', 'red');
        break;
      }
      await osActions(firstArg);
      break;

    case 'hash':
      if (!firstArg) {
        showMessage('Invalid input', 'red');
        break;
      }
      await getHash(firstArgPath);
      break;

    case '.exit':
      sayGoodbye(userName);
      process.exit();

    default:
      showMessage('Invalid input', 'red');
  }

  showMessage(`You are currently in ${currentPath}`, 'green');
});

process.on('SIGINT', () => {
  sayGoodbye(userName);
  process.exit();
});
