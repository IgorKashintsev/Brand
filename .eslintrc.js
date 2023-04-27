module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,
  },
}