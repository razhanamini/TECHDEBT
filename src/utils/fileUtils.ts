import * as fs from 'fs';
import * as path from 'path';


export async function getAllFilePaths(dir = process.cwd(), fileList: string[] = []): Promise<string[]> {
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
      // Skip common directories that shouldn't be scanned
      const skipDirs = ['node_modules', '.git', 'dist', 'build', 'coverage', '.next', '.nuxt', 'target'];
      if (skipDirs.includes(file)) continue;
      await getAllFilePaths(filePath, fileList);
    } else {
      // Skip binary files and common non-source files
      const skipExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.zip', '.tar', '.gz'];
      const ext = path.extname(file).toLowerCase();
      if (skipExtensions.includes(ext)) continue;
      
      fileList.push(filePath);
    }
  }

  return fileList;
}
