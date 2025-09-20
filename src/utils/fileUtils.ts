import * as fs from 'fs';
import * as path from 'path';


export async function getAllFilePaths(dir = process.cwd(), fileList: string[] = []): Promise<string[]> {
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (file === 'node_modules' || file === '.git') continue;
      await getAllFilePaths(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}
