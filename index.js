import colors from './common/colors.js';
import getUserName from './functions/getUserName.js';
import greetUser from './functions/greetUser.js';
import sayGoodbye from './functions/sayGoodbye.js';
import os from 'os';

const userName = getUserName();
let currentPath = os.homedir();

greetUser(userName, currentPath);

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  switch (data.trim()) {
    case '.exit':
      sayGoodbye(userName);
      process.exit();
    default:
      console.log(`\n${colors.red}Invalid input${colors.reset}`);
  }

  console.log(`${colors.cyan}You are currently in ${currentPath}${colors.reset}`);
});

process.on('SIGINT', () => {
  sayGoodbye(userName);
  process.exit();
});
