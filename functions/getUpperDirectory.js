import path from "path";
import * as url from "url";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default function getUpperDirectory(currentPath) {
  if (currentPath.length === 3) {
    return currentPath;
  }

  const newPath = path.join(currentPath, "..");
  return newPath;
}
