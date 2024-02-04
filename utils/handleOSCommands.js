import os from 'os';
import { printInConsole } from './console-messages.js';

export default function handleOSCommands(arg) {
    const command = arg.slice(2);
    switch (command) {
        case 'EOL':
            const eol = os.EOL;
            printInConsole(`The end of a line in the current OS is: ${JSON.stringify(eol)}`, 'yellow');
            break;

        default:
            printInConsole('Invalid input', 'red');
    }
}