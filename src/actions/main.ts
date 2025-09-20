import * as core from '@actions/core';
import { getConfigPatterns } from '../services/configLoader.js';
import { getAllFilePaths } from '../utils/fileUtils.js';
import { scanForPatterns } from '../services/fileScanner.js';
import { createIssueForPatterns } from '../services/githubClient.js';


async function run() {
  try {
    // 1. Load the user-defined patterns
    const patterns = getConfigPatterns();
    core.info(`Patterns to scan: ${patterns.join(', ')}`);

    // 2. Get all file paths in the repository
    const filePaths = await getAllFilePaths();
    core.info(`Scanning ${filePaths.length} files...`);

    // 3. Scan files for matches
    const matches = scanForPatterns(patterns, filePaths);
    core.info(`Found ${matches.length} matches.`);

    // 4. If matches found, create a GitHub issue
    if (matches.length > 0) {
      const issueBody = matches
        .map(m => `File: ${m.filePath}, Line: ${m.line}, Match: ${m.pattern}`)
        .join('\n');
      const issue = await createIssueForPatterns(matches);
      core.info(`Created issue #${issue?.number} at ${issue?.html_url}`);
    } else {
      core.info('No patterns found. Nothing to report.');
    }

  } catch (error: any) {
    // 5. Handle errors
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

// Run the main function
run();
