/**
 * Content lint: runs AFTER sync-content.mjs and fails the build if any
 * Docusaurus-ism appears in content/ that the static pipeline does not
 * explicitly handle. Upstream docs evolve; this gate turns "someone started
 * using <NewComponent> or ```mermaid in apache/apisix docs" into a red CI
 * check instead of a silently broken page.
 *
 * Checks operate outside fenced code blocks and inline code spans.
 * Errors fail (exit 1); warnings only print.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const contentDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'content');

const KNOWN_ADMONITIONS = new Set(['note', 'tip', 'info', 'warning', 'danger', 'caution', 'important']);

const errors = [];
const warnings = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

function stripInlineCode(line) {
  return line.replace(/`[^`]*`/g, '``');
}

for (const file of walk(contentDir)) {
  const rel = path.relative(contentDir, file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let inFence = false;
  let fenceChar = '';

  lines.forEach((rawLine, i) => {
    const loc = `${rel}:${i + 1}`;
    const fenceMatch = rawLine.match(/^(\s*)(```+|~~~+)(.*)$/);
    if (fenceMatch) {
      const marker = fenceMatch[2][0];
      if (!inFence) {
        inFence = true;
        fenceChar = marker;
        const meta = fenceMatch[3].trim();
        // Opening fence checks (the only checks that apply inside fence syntax)
        if (/^mermaid\b/.test(meta)) {
          errors.push(`${loc}: mermaid code fence — pipeline has no mermaid renderer`);
        }
        if (/title=/.test(meta)) {
          if (fenceMatch[1] === '') {
            errors.push(`${loc}: unconverted code-block title= (sync transform should have rewritten it)`);
          } else {
            warnings.push(`${loc}: indented code fence keeps title= meta (ignored by highlighter)`);
          }
        }
      } else if (marker === fenceChar) {
        inFence = false;
      }
      return;
    }
    if (inFence) return;

    const line = stripInlineCode(rawLine);

    // 1. Residual MDX imports/exports
    if (/^\s*(import|export)\s+.*from\s+['"]/.test(line) || /^\s*import\s+['"]/.test(line)) {
      errors.push(`${loc}: MDX import/export statement survived sync`);
    }
    // 2. Residual JSX-style components (Docusaurus MDX): <Tabs>, <TabItem>, anything Capitalized
    const jsx = line.match(/<([A-Z][A-Za-z0-9]*)(\s|\/?>)/);
    if (jsx) {
      errors.push(`${loc}: unhandled component-like tag <${jsx[1]}>`);
    }
    // 3. Unknown admonition types
    const adm = line.match(/^:::(\w+)/);
    if (adm && !KNOWN_ADMONITIONS.has(adm[1])) {
      errors.push(`${loc}: unknown admonition ':::${adm[1]}'`);
    }
    // 4. Relative .md links that sync should have rewritten
    const mdLink = line.match(/\]\((?!https?:\/\/)([^)\s]*\.md)(#[^)]*)?\)/);
    if (mdLink) {
      errors.push(`${loc}: unrewritten relative .md link '${mdLink[1]}'`);
    }
    // 5. Docusaurus-only path aliases
    if (line.includes('@site/') || line.includes('@theme/') || line.includes('@docusaurus/')) {
      errors.push(`${loc}: Docusaurus path alias reference`);
    }
  });

  if (inFence) warnings.push(`${rel}: unclosed code fence at EOF`);
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`lint-content: ${errors.length} errors, ${warnings.length} warnings`);
if (errors.length) process.exit(1);
