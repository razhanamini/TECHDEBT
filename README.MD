# Debt Scanner Action

A GitHub Action that scans your codebase for custom markers like `TODO`, `FIXME`, `HACK`, or any other keywords you define, and creates GitHub issues for them.

---

## Usage

Create a workflow in `.github/workflows/debt-scanner.yml`:

```yaml
name: Debt Scanner

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  scan-debt:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Run debt scanner
      uses: ./
      with:
        patterns: "TODO,FIXME,HACK,BUG"
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
