import colors from '../common/colors.js';

function printInConsole(message = 'Operation failed', color = 'red') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function greetUser(username, currentPath) {
    printInConsole(`Welcome to the File Manager, ${username}!`, 'cyan');
    printInConsole(`(For exit use 'ctrl + c' or type '.exit')`, 'magenta');
    printInConsole(`You are currently in ${currentPath}`, 'green');
}

function sayGoodbye(username) {
    printInConsole(`Thank you for using File Manager, ${username}, goodbye!`, 'cyan');
}

export { greetUser, printInConsole, sayGoodbye };