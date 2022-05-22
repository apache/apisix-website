# Vscode

> Vscode Extensions

- ESLint
  - id: "dbaeumer.vscode-eslint"
  - recommend reason: "Integrates ESLint JavaScript into VS Code."
- Stylelint
  - id: "stylelint.vscode-stylelint"
  - recommend reason: "Official Stylelint extension for Visual Studio Code"
- GitLens
  - id: "eamodio.gitlens"
  - recommend reason: "It helps you to visualize code authorship at a glance via Git blame annotations and CodeLens"
- markdownlit
  - id: "DavidAnson.vscode-markdownlint"
  - recommend reason: "Markdown linting and style checking for Visual Studio Code"

> Vscode Settings

```json
{
  // ===
  // Spacing
  // ===

  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": true,
  "files.trimTrailingWhitespace": true,
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,

  // ===
  // Files
  // ===

  "files.exclude": {
    "**/dist": true
  },
  "files.associations": {
    ".markdownlintrc": "jsonc",
  },

  // ===
  // Event Triggers
  // ===

  "editor.formatOnSave": true,

  // ===
  // Eslint
  // ===
  "eslint.alwaysShowStatus": true,
  "eslint.debug": true,
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
}
```
