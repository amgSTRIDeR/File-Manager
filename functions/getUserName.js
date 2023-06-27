import os from 'os';

export default function getUserName() {
  const commandLineArgs = process.argv.slice(2);
  const userName =
    commandLineArgs
      .filter((arg) => arg.startsWith('--username='))
      .map((arg) => arg.slice(11))[0] ||
    os.userInfo().username ||
    'Unknown User';

  return userName;
}
