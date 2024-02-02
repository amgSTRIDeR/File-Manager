import { stdin } from "process"
import getUsername from "./utils/getUsername.js";

const username = getUsername();
console.log(`Welcome to the File Manager, ${username}!`)

stdin.on('data', (data) => {
    console.log(data)
    })