import { stdin } from "process"
import os from "os";
import * as utils from "./_imports.js";

function isTarget(target) {
    if (!target) {
        utils.printInConsole('Invalid input', 'red');
        return false;
    }
    return true;
}

const username = utils.getUsername();
let currentDirectory = os.homedir();

utils.greetUser(username, currentDirectory);

stdin.on('data', async (data) => {
    const preparedData = data.toString().trim().split(' ');
    const target = preparedData.slice(1).join(' ');

    switch (preparedData[0]) {
        case ('up'):
            currentDirectory = utils.getUpperDirectory(currentDirectory);
            break;
        case ('cd'):
            if (isTarget(target)) {
                currentDirectory = await utils.getDirectoryPath(currentDirectory, target);
            }
            break;
        case ('ls'):
            await utils.showList(currentDirectory);
            break;
        case ('cat'):
            if (isTarget(target)) {
                await utils.showFileContent(currentDirectory, target);
            }
            break;
        case ('add'):
            if (isTarget(target)) {
                await utils.createFile(currentDirectory, target);
            }
            break;
        case ('rn'):
            if (isTarget(target)) {
                await utils.renameFile(currentDirectory, preparedData[1], preparedData[2]);
            }
            break;
        case ('cp'):
            if (preparedData[1] && preparedData[2]) {
                await utils.copyFile(currentDirectory, preparedData[1], preparedData[2]);
            } else {
                utils.printInConsole('Invalid input', 'red');
            }
            break;
        case ('mv'):
            if (preparedData[1] && preparedData[2]) {
                await utils.copyFile(currentDirectory, preparedData[1], preparedData[2], { deleteSource: true });
            } else {
                utils.printInConsole('Invalid input', 'red');
            }
            break;
        case ('rm'):
            if (isTarget(target)) {
                await utils.removeFile(currentDirectory, target);
            }
            break;
        case ('os'):
            if (preparedData[1] && preparedData[1].startsWith('--')) {
                utils.handleOSCommands(preparedData[1]);
            } else {
                utils.printInConsole('Invalid input', 'red');
            }
            break;
        case ('hash'):
            if (isTarget(target)) {
                await utils.calculateHash(currentDirectory, target);
            }
            break;
        case ('compress'):
            if (preparedData[1] && preparedData[2]) {
                await utils.compressFile(currentDirectory, preparedData[1], preparedData[2]);
            } else {
                utils.printInConsole('Invalid input', 'red');
            }
            break;
        case ('decompress'):
            if (preparedData[1] && preparedData[2]) {
                await utils.decompressFile(currentDirectory, preparedData[1], preparedData[2]);
            } else {
                utils.printInConsole('Invalid input', 'red');
            }
            break;
        case ('.exit'):
            utils.sayGoodbye(username);
            process.exit();
        default:
            utils.printInConsole('Invalid input', 'red');
    }

    utils.showCurrentPath(currentDirectory);
    utils.proposeToTypeCommand(username);
})

process.on('SIGINT', () => {
    utils.sayGoodbye(username);
    process.exit();
});