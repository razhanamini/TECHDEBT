import * as core from '@actions/core';
export function getConfigPatterns() {
    try {
        const rawPatterns = core.getInput('patterns');
        if (!rawPatterns) {
            core.warning('No patterns provided, defaulting to TODO');
            return ['TODO']; // fallback default
        }
        const patterns = rawPatterns.split(',').map(p => p.trim());
        console.log('Patterns to scan:', patterns);
        return patterns;
    }
    catch (error) {
        // Mark the GitHub Action as failed
        if (error instanceof Error) {
            core.setFailed(`Action failed: ${error.message}`);
        }
        else {
            core.setFailed(`Action failed: ${String(error)}`);
        }
        return []; // return empty array to satisfy type
    }
}
//# sourceMappingURL=configLoader.js.map