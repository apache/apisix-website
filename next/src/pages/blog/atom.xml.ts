import blogFeedResponse from '../../lib/blog-feed';

export const prerender = true;

export function GET(): Response {
  return blogFeedResponse('en', 'atom');
}
