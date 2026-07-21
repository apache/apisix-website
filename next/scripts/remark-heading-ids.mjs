import { visit } from 'unist-util-visit';

// Docusaurus explicit heading anchors: `## Some title {#custom-id}`.
// Strips the marker from the rendered text and applies the id, so existing
// deep links like /docs/apisix/foo/#custom-id keep working.
// (Headings without a marker get github-slugger ids from Astro's default
// pipeline, which matches Docusaurus' own slugger.)
const MARKER = /\s*\{#([A-Za-z0-9-_.]+)\}\s*$/;

export function remarkHeadingIds() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const last = node.children[node.children.length - 1];
      if (!last || last.type !== 'text') return;
      const m = last.value.match(MARKER);
      if (!m) return;
      last.value = last.value.replace(MARKER, '');
      const data = node.data || (node.data = {});
      const props = data.hProperties || (data.hProperties = {});
      props.id = m[1];
    });
  };
}
