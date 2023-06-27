import showMessage from './showMessage.js';

export default function sayGoodbye(userName) {
  showMessage(`Thank you for using File Manager, ${userName}, goodbye!`, 'cyan');
}