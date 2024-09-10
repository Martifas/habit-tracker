// @ts-nocheck

const { default: jsx } = require('@vue/eslint-config-airbnb/rules/jsx');
const { error } = require('console');

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue', 'ts'],
      },
    },
  },
  rules: {
    import/extensions: [
      error, ignorePackages, {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never'
      }
    ]
  }
};
