import colors from '../common/colors.js';

export default function sayGoodbye(userName) {
  console.log(`\n${colors.green}Thank you for using File Manager, ${userName}, goodbye!${colors.reset}\n`);
}