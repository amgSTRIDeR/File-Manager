import fs from 'fs';
import colors from '../common/colors.js';

export default async function createFile(pathToFile) {
  if (fs.existsSync(pathToFile)) {
    console.log(`${colors.red}Operation failed${colors.reset}`);
    return;
  }

  try {
    await fs.promises.writeFile(pathToFile, '');
    console.log(`${colors.yellow}File created successfully${colors.reset}`);
  } catch (err) {
    console.log(`${colors.red}Operation failed${colors.reset}`);
  }
}
