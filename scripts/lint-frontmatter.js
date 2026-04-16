/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const IGNORED_DIRS = new Set([
  '.git',
  'build',
  'dist',
  'node_modules',
]);
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx']);

function walk(dir, files = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        walk(path.join(dir, entry.name), files);
      }
      return;
    }

    if (entry.isFile() && MARKDOWN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(path.join(dir, entry.name));
    }
  });

  return files;
}

function extractFrontmatter(content) {
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
    return null;
  }

  const lines = content.split(/\r?\n/);
  const closingIndex = lines.slice(1).findIndex((line) => line.trim() === '---');
  if (closingIndex >= 0) {
    return lines.slice(1, closingIndex + 1).join('\n');
  }

  throw new Error('Missing closing frontmatter delimiter');
}

function main() {
  const failures = [];

  walk(ROOT).forEach((file) => {
    const relativePath = path.relative(ROOT, file);
    const content = fs.readFileSync(file, 'utf8');

    try {
      const frontmatter = extractFrontmatter(content);
      if (frontmatter !== null) {
        yaml.load(frontmatter);
      }
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  });

  if (failures.length > 0) {
    console.error('Invalid Markdown frontmatter found:\n');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
}

main();
