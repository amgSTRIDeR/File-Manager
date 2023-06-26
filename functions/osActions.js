import os from 'os';
import showMessage from './showMessage.js';

export default async function osActions(arg) {
  switch (arg) {
    case '--EOL':
      showMessage(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`, 'yellow');
      break;

      default:
        showMessage('Invalid input', 'red');
  }
}
