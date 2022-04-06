const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    quotes: [ERROR, 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
    '@typescript-eslint/ban-ts-comment': [
      ERROR,
      { 'ts-expect-error': 'allow-with-description' },
    ],
    '@typescript-eslint/consistent-indexed-object-style': [
      WARNING,
      'index-signature',
    ],
    '@typescript-eslint/consistent-type-imports': [
      WARNING,
      { disallowTypeAnnotations: false },
    ],
    '@typescript-eslint/explicit-module-boundary-types': WARNING,
    '@typescript-eslint/method-signature-style': ERROR,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-empty-interface': [
      ERROR,
      { allowSingleExtends: true },
    ],
    '@typescript-eslint/no-inferrable-types': OFF,
    '@typescript-eslint/no-namespace': [WARNING, { allowDeclarations: true }],
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [
      ERROR,
      { functions: false, classes: false, variables: true },
    ],
    '@typescript-eslint/no-non-null-assertion': OFF,
    'no-redeclare': OFF,
    '@typescript-eslint/no-redeclare': ERROR,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': ERROR,
    'import/no-unresolved': [
      ERROR,
      {
        ignore: [
          '^@theme',
          '^@docusaurus',
          '^@generated',
          '^@site',
          '^@testing-utils',
        ],
      },
    ],
    'no-lonely-if': OFF,
    'no-lone-blocks': OFF,
  },
  overrides: [
    {
      files: [
        'scripts/**/*.js',
        'website/src/clientModules/**/*.js',
        'website/config/**/*.js',
        'website/babel.config.js',
        'website/docusaurus.config.js',
      ],
      env: {
        node: true,
        amd: true,
      },
      rules: {
        'global-require': WARNING,
        'import/extensions': OFF,
        'import/no-extraneous-dependencies': OFF,
        '@typescript-eslint/no-shadow': OFF,
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      extends: [
        'plugin:yml/standard',
      ],
      parser: 'yaml-eslint-parser',
    },
  ],
};
