import printInConsole from "./printInConsole.js";

export default function greetUser(username, currentPath) {
    printInConsole(`Welcome to the File Manager, ${username}!`, 'cyan');
    printInConsole(`(For exit use 'ctrl + c' or type '.exit')`, 'magenta');
    printInConsole(`You are currently in ${currentPath}`, 'green');
}