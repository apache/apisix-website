const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: `${__dirname}/website`,
    projects: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      },
    },
  },
  rules: {
    quotes: [ERROR, 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
    '@typescript-eslint/ban-ts-comment': [ERROR, { 'ts-expect-error': 'allow-with-description' }],
    '@typescript-eslint/consistent-indexed-object-style': [WARNING, 'index-signature'],
    '@typescript-eslint/consistent-type-imports': [WARNING, { disallowTypeAnnotations: false }],
    '@typescript-eslint/explicit-module-boundary-types': WARNING,
    '@typescript-eslint/method-signature-style': ERROR,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-empty-interface': [ERROR, { allowSingleExtends: true }],
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
        ignore: ['^@theme', '^@docusaurus', '^@generated', '^@site', '^@testing-utils'],
      },
    ],
    'no-lonely-if': OFF,
    'no-lone-blocks': OFF,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [ERROR, { tsx: 'never', svg: 'always', json: 'never' }],
    'import/no-relative-packages': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/function-component-definition': [
      ERROR,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'consistent-return': OFF,
  },
  overrides: [
    {
      files: [
        'scripts/**/*.js',
        'website/src/clientModules/**/*.js',
        'config/**/*.js',
        '**/*/babel.config.js',
        '**/*/docusaurus.config.*',
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
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      extends: ['plugin:yml/standard'],
      parser: 'yaml-eslint-parser',
    },
  ],
};
