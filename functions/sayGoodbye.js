import colors from '../common/colors.js';

export default function sayGoodbye(userName) {
  console.log(`\n${colors.cyan}Thank you for using File Manager, ${colors.yellow}${userName}${colors.cyan}, goodbye!${colors.reset}\n`);
}