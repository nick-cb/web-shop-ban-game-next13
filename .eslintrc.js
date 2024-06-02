module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['eslint-plugin-react-compiler', '@typescript-eslint'],
  root: true,
  rules: {
    'react-compiler/react-compiler': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-empty': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'react/no-unescaped-entities': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-func-assign': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'valid-typeof': 'off',
    'no-var': 'off',
    'prefer-const': 'off',
  },
};
