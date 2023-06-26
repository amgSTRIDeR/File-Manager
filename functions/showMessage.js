import colors from '../common/colors.js';

export default function showMessage(message = 'Operation failed', color = 'red') {
  console.log(`${colors[color] || colors.red}${message}${colors.reset}`);
}
