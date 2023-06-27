import showMessage from './showMessage.js';

export default function greetUser(userName, currentPath) {
  showMessage(`Welcome to the File Manager, ${userName}!`, 'cyan');
  showMessage(`You are currently in ${currentPath}`, 'green');
}
