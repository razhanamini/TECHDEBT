# Debt Scanner Action

A GitHub Action that scans your codebase for custom markers like `TODO`, `FIXME`, `HACK`, or any other keywords you define, and creates GitHub issues for them.

---

## Usage

### Quick Start

Copy the example workflow from `example-workflow.yml` to your repository as `.github/workflows/debt-scanner.yml`, or create your own workflow:

```yaml
name: Debt Scanner

on:
  workflow_dispatch:
    inputs:
      patterns:
        description: 'Comma-separated patterns to search for (e.g., TODO,FIXME,HACK)'
        required: true
        default: 'TODO,FIXME,HACK'
      create_issues:
        description: 'Create GitHub issues for found patterns'
        required: false
        default: true
        type: boolean

jobs:
  scan-debt:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Run debt scanner
      uses: razhanamini/TECHDEBT@main
      with:
        patterns: ${{ github.event.inputs.patterns }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Automatic Runs

You can also set it to run automatically on pushes and PRs:

```yaml
name: Debt Scanner

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:
    inputs:
      patterns:
        description: 'Comma-separated patterns to search for'
        required: true
        default: 'TODO,FIXME,HACK'

jobs:
  scan-debt:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Run debt scanner
      uses: razhanamini/TECHDEBT@main
      with:
        patterns: ${{ github.event.inputs.patterns || 'TODO,FIXME,HACK' }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

- `patterns`: Comma-separated list of patterns to search for (default: "TODO,FIXME,HACK")
- `github-token`: GitHub token for creating issues (required)

## Features

- Scans all files in the repository (excluding node_modules and .git)
- Creates GitHub issues for found patterns
- Configurable search patterns
- Case-insensitive matching
- Reports file path, line number, and matched content
