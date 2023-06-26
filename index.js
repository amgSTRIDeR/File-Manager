import colors from './common/colors.js';
import getUserName from './functions/getUserName.js';
import greetUser from './functions/greetUser.js';
import sayGoodbye from './functions/sayGoodbye.js';
import os from 'os';
import getUpperDirectory from './functions/getUpperDirectory.js';
import getDirectoryPath from './functions/getDirectoryPath.js';

const userName = getUserName();
let currentPath = os.homedir();

greetUser(userName, currentPath);

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  switch (data.trim().split(' ')[0]) {
    case '.exit':
      sayGoodbye(userName);
      process.exit();
    case 'up':
      currentPath = getUpperDirectory(currentPath);
      break;
    case 'cd':
      const dirPath = data.split(' ')[1].trim() || '';
      currentPath = getDirectoryPath(dirPath, currentPath);
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
