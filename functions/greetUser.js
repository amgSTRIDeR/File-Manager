import colors from '../common/colors.js';

export default function greetUser(userName, currentPath) {
  console.log(`\n${colors.green}Welcome to the File Manager, ${userName}!${colors.reset}`);
  console.log(`${colors.cyan}You are currently in ${currentPath}${colors.reset}`);
}
