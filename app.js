import { stdin } from "process"
import os from "os";
import getUsername from "./utils/getUsername.js";
import greetUser from "./utils/greetUser.js";

const username = getUsername();
let currentDirectory = os.homedir();

greetUser(username, currentDirectory);

stdin.on('data', (data) => {
    })