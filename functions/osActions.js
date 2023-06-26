import os from 'os';
import showMessage from './showMessage.js';
import getCpusInfo from './getCpusInfo.js';

export default async function osActions(arg) {
  switch (arg) {
    case '--EOL':
      showMessage(
        `Default system End-Of-Line: ${JSON.stringify(os.EOL)}`,
        'yellow'
      );
      break;

    case '--cpus':
      getCpusInfo();
      break;

    case '--homedir':
      showMessage(`Home directory: ${os.homedir()}`, 'yellow');
      break;

    case '--username':
      showMessage(`Current username: ${os.userInfo().username}`, 'yellow');
      break;

    case '--architecture':
      showMessage(`CPU architecture: ${process.arch}`, 'yellow');
      break;

    default:
      showMessage('Invalid input', 'red');
  }
}
