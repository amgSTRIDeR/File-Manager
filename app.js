import { stdin } from "process"
import os from "os";
import * as utils from "./_imports.js";

function isTargetPathExist(targetPath) {
    if (!targetPath) {
        utils.printInConsole('Invalid input', 'red');
        return false;
    }
    return true;
}

const username = utils.getUsername();
let currentDirectory = os.homedir();
//develop
currentDirectory = 'd:/nodejs-sandbox';
utils.greetUser(username, currentDirectory);

stdin.on('data', async (data) => {
    const preparedData = data.toString().trim().split(' ');
    const targetPath = preparedData.slice(1).join(' ');
    const targetPathIsExist = isTargetPathExist(targetPath);

    switch (preparedData[0]) {
        case ('up'):
            currentDirectory = utils.getUpperDirectory(currentDirectory);
            break;
        case ('cd'):
            if (targetPathIsExist) {
                currentDirectory = await utils.getDirectoryPath(currentDirectory, targetPath);
            }
            break;
        case ('ls'):
            await utils.showList(currentDirectory);
            break;
        case ('cat'):
            if (targetPathIsExist) {
                await utils.showFileContent(currentDirectory, targetPath);
            }
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