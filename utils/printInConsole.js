import colors from '../common/colors.js';

export default function printInConsole(message = 'Operation failed', color = 'red') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}