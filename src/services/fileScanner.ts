import * as fs from 'fs';
import { PatternMatch } from '../types/models';

/**
 * Scan multiple files for the given patterns and return all matches.
 * @param patterns Array of string patterns to search for.
 * @param filePaths Array of file paths to scan.
 * @returns Array of PatternMatch objects.
 */
export function scanForPatterns(patterns: string[], filePaths: string[]): PatternMatch[] {
  const results: PatternMatch[] = [];
  const timestamp = new Date().toISOString();

  filePaths.forEach((filePath) => {
    try {
      const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

      lines.forEach((line, lineIndex) => {
        patterns.forEach((pattern) => {
          const regex = new RegExp(pattern, 'i');
          const match = regex.exec(line);
          if (match) {
            results.push({
              filePath,
              content: line,
              line: lineIndex + 1,
              column: match.index + 1,
              pattern,
              snippet: line.trim(),
              timestamp,
            });
          }
        });
      });
    } catch (err) {
      console.error(`Failed to read file ${filePath}:`, err);
    }
  });

  return results;
}
