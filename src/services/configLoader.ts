import * as core from '@actions/core';

export function getConfigPatterns(): string[] {
  try {
    const rawPatterns = core.getInput('patterns'); 
    if (!rawPatterns) {
      // Use the default patterns from action.yml
      return ['TODO', 'FIXME', 'HACK'];
    }
    const patterns: string[] = rawPatterns.split(',').map(p => p.trim());
    console.log('Patterns to scan:', patterns);
    return patterns;
  } catch (error: unknown) {
    // Mark the GitHub Action as failed
    if (error instanceof Error) {
      core.setFailed(`Action failed: ${error.message}`);
    } else {
      core.setFailed(`Action failed: ${String(error)}`);
    }
    return []; // return empty array to satisfy type
  }
}
