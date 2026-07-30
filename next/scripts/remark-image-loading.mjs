import { visit } from 'unist-util-visit';

// Body images in synced docs are bare `![alt](url)` — no dimensions, no
// loading hint — and most are remote (static.api7.ai), so the browser has
// nothing to reserve space with and fetches every one eagerly. On a page like
// /docs/apisix/plugins/openid-connect/ that is eight diagrams, ~235 KB, all
// blocking and all shifting the layout as they arrive.
//
// The intrinsic size isn't knowable at build time for remote images, so the
// space is reserved in CSS (`.prose img` carries an aspect-ratio placeholder);
// here we add the loading hints the markup can carry.
export function remarkImageLoading() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const data = node.data || (node.data = {});
      const props = data.hProperties || (data.hProperties = {});
      if (props.loading === undefined) props.loading = 'lazy';
      if (props.decoding === undefined) props.decoding = 'async';
    });
  };
}
