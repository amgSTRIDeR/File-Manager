import fs from 'fs';
import colors from '../common/colors.js';

export default async function createFile(oldPathToFile, newPathToFile) {
  if (!fs.existsSync(oldPathToFile) || fs.existsSync(newPathToFile)) {
    console.log(`${colors.red}Operation failed${colors.reset}`);
    return;
  }

  try {
    await fs.promises.rename(oldPathToFile, newPathToFile);
    console.log(`${colors.yellow}File renamed successfully${colors.reset}`);
  } catch (err) {
    console.log(`${colors.red}Operation failed${colors.reset}`);
  }
}
