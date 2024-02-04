import { stdin } from "process"
import os from "os";
import * as utils from "./_imports.js";

const username = utils.getUsername();
let currentDirectory = os.homedir();
utils.greetUser(username, currentDirectory);

stdin.on('data', (data) => {
    const preparedData = data.toString().trim();

    switch (preparedData) {
        case ('up'):
            currentDirectory = utils.getUpperDirectory(currentDirectory);
            break;
        case ('.exit'):
            utils.sayGoodbye(username);
            process.exit();
        default:
            utils.printInConsole('Invalid input', 'red');
    }

    utils.showCurrentPath(currentDirectory);
})

process.on('SIGINT', () => {
    utils.sayGoodbye(username);
    process.exit();
});