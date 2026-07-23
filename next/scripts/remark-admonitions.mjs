import { visit } from 'unist-util-visit';

const TYPES = new Set(['note', 'tip', 'info', 'warning', 'danger', 'caution', 'important']);

// Renders Docusaurus-style ":::note" container directives as static
// <div class="admonition"> blocks — no client JS involved.
export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      if (!TYPES.has(node.name)) return;
      const data = node.data || (node.data = {});
      const label = node.children.find((c) => c.data && c.data.directiveLabel);
      let title = node.name.toUpperCase();
      if (label) {
        title = label.children.map((c) => c.value ?? '').join('');
        node.children = node.children.filter((c) => c !== label);
      }
      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['admonition-title'] } },
        children: [{ type: 'text', value: title }],
      });
      data.hName = 'div';
      data.hProperties = { className: ['admonition', `admonition-${node.name}`] };
    });
  };
}
