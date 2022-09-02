import remarkFrontmatter from 'remark-frontmatter';
import rlFmSchema from '@julian_cataldo/remark-lint-frontmatter-schema';


const remarkConfig = {
    plugins: [
        "remark-preset-lint-consistent",
        "remark-preset-lint-recommended",
        "remark-preset-lint-markdown-style-guide",
        ["remark-lint-maximum-line-length", false],
        ["maximum-heading-length", false],
        ["remark-lint-ordered-list-marker-value", [1, "ordered"]],
        remarkFrontmatter,
        [
          rlFmSchema,
          {
            schemas: {
              './blog/creative-work.schema.yaml': [
                './blog/en/blog/*.md',
                './blog/zh/blog/*.md',
              ],
            },
          },
        ],
      ],
};

export default remarkConfig;