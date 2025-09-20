import * as github from '@actions/github';
import * as core from '@actions/core';
import type { PatternMatch } from '../types/models.js';

export async function createIssueForPatterns(matches: PatternMatch[]) {
  if (matches.length === 0) {
    core.info('No patterns found. Skipping issue creation.');
    return;
  }

  const octokit = github.getOctokit(core.getInput('github-token'));

  const issueBody = matches.map(m =>
    `**${m.pattern}** found in \`${m.filePath}\` at line ${m.line}:\n\`\`\`\n${m.content}\n\`\`\``
  ).join('\n\n');

  const { data: issue } = await octokit.rest.issues.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title: `Found ${matches.length} pattern(s) in the code`,
    body: issueBody
  });

  core.info(`Created issue #${issue.number}`);

  return issue;
}
