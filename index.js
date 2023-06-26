import getUserName from './functions/getUserName.js';
import greetUser from './functions/greetUser.js';
import sayGoodbye from './functions/sayGoodbye.js';

const userName = getUserName();

greetUser(userName);

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  if (data.trim() === '.exit') {
    sayGoodbye(userName);
    process.exit();
  }
});


process.on('SIGINT', () => {
  sayGoodbye(userName);
  process.exit();
});
