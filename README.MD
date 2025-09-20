# Code Fix Finder Action

A GitHub Action that scans your codebase for custom markers like `TODO`, `FIXME`, `HACK`, or any other keywords you define, and optionally creates issues or pull request comments for them.

---

## Usage

Create a workflow in `.github/workflows/scan.yml`:

```yaml
name: Scan Code Fixes

on:
  workflow_dispatch:
    inputs:
      markers:
        description: 'Comma-separated keywords to search for'
        required: true
        default: 'TODO,FIXME,HACK'
      create_issues:
        description: 'Whether to create GitHub issues for found markers'
        required: false
        default: false

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Code Fix Finder
        uses: your-username/code-fix-finder@v1
        with:
          markers: ${{ github.event.inputs.markers }}
          create-issues: ${{ github.event.inputs.create_issues }}
# TECHDEBT
