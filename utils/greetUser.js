import printInConsole from "./printInConsole.js";

export default function greetUser(username, currentPath) {
    printInConsole(`Welcome to the File Manager, ${username}!`, 'cyan');
    printInConsole(`You are currently in ${currentPath}`, 'green');
}