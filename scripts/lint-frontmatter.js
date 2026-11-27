/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const IGNORED_DIRS = new Set([
  '.git',
  'build',
  'dist',
  'node_modules',
]);
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx']);
const MONTHLY_REPORT = /^blog\/(en|zh)\/blog\/\d{4}\/\d{2}\/\d{2}\/[^/]*monthly-report\.mdx?$/;

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
  const reports = [];

  walk(ROOT).forEach((file) => {
    const relativePath = path.relative(ROOT, file).split(path.sep).join('/');
    const content = fs.readFileSync(file, 'utf8');

    try {
      const frontmatter = extractFrontmatter(content);
      const metadata = frontmatter === null ? null : yaml.load(frontmatter);
      const monthly = relativePath.match(MONTHLY_REPORT);
      if (monthly) {
        reports.push({
          file: relativePath,
          language: monthly[1],
          description: typeof metadata?.description === 'string'
            ? metadata.description.trim().replace(/\s+/g, ' ').toLowerCase() : '',
        });
      }
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  });

  // Check only reports changed by this PR; leave historical duplicates untouched.
  if (process.env.BASE_SHA) {
    const range = `${process.env.BASE_SHA}...${process.env.HEAD_SHA || 'HEAD'}`;
    const changed = new Set(execFileSync('git', [
      'diff', '--name-only', '--diff-filter=ACMR', '-z', range,
    ], { cwd: ROOT, encoding: 'utf8' }).split('\0'));
    reports.filter((report) => changed.has(report.file)).forEach((report) => {
      const duplicate = reports.find((other) => other.file !== report.file
        && other.language === report.language && other.description === report.description);
      if (!report.description) {
        failures.push(`${report.file}: description must be a non-empty string`);
      } else if (duplicate) {
        failures.push(`${report.file}: description repeats ${duplicate.file}`);
      }
    });
  }

  if (failures.length > 0) {
    console.error('Invalid Markdown frontmatter found:\n');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
}

main();
