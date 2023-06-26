import colors from '../common/colors.js';

export default function greetUser(userName, currentPath) {
  console.log(`\n${colors.cyan}Welcome to the File Manager, ${colors.yellow}${userName}${colors.cyan}!${colors.reset}`);
  console.log(`${colors.green}You are currently in ${currentPath}${colors.reset}`);
}
