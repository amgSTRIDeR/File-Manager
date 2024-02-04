import { stdin } from "process"
import os from "os";
import * as utils from "./_imports.js";

const username = utils.getUsername();
let currentDirectory = os.homedir();
utils.greetUser(username, currentDirectory);

stdin.on('data', (data) => {
    utils.showCurrentPath(currentDirectory);
    const preparedData = data.toString().trim();

    switch (preparedData) {
        case ('.exit'):
            utils.sayGoodbye(username);
            process.exit();
            break;
    }

})

process.on('SIGINT', () => {
    utils.sayGoodbye(username);
    process.exit();
});