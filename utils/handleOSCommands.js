import os from 'os';
import { printInConsole } from './console-messages.js';

export default function handleOSCommands(arg) {
    const command = arg.slice(2);
    switch (command) {
        case 'EOL':
            const eol = os.EOL;
            printInConsole(`The end of a line in the current OS is: ${JSON.stringify(eol)}`, 'yellow');
            break;
        case 'cpus':
            const cpus = os.cpus();
            printInConsole(`The number of CPUs is: ${cpus.length}`, 'yellow');
            printInConsole(`The model of the CPU is: ${cpus[0].model}`, 'yellow');
            printInConsole(`The clock rate of the CPU is: ${(cpus[0].speed/1000).toFixed(2)} GHz`, 'yellow');
            break;
        case 'homedir':
            const homedir = os.homedir();
            printInConsole(`The home directory is: ${homedir}`, 'yellow');
            break;
        case 'username':
            const username = os.userInfo().username;
            printInConsole(`The username is: ${username}`, 'yellow');
            break;
        default:
            printInConsole('Invalid input', 'red');
    }
}