import os from 'os';

export default function getUsername() {
    const arg = process.argv.slice(2).filter(arg => arg.startsWith('--username='));
    const username = arg.length ? arg[0].split('=')[1] : os.userInfo().username ||
        'Unknown User';
    return username;
}