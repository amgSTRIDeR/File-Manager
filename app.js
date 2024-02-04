import { stdin } from "process"
import os from "os";
import * as utils from "./_imports.js";

const username = utils.getUsername();
let currentDirectory = os.homedir();
//develop
currentDirectory = 'd:/nodejs-sandbox';
utils.greetUser(username, currentDirectory);

stdin.on('data', async (data) => {
    const preparedData = data.toString().trim().split(' ');
    switch (preparedData[0]) {
        case ('up'):
            currentDirectory = utils.getUpperDirectory(currentDirectory);
            break;
            case('cd'):
            const targetPath = preparedData[1];
            if (targetPath === undefined) {
                utils.printInConsole('Invalid input', 'red');
                break;
            }
            currentDirectory = await utils.getDirectoryPath(currentDirectory, targetPath);
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