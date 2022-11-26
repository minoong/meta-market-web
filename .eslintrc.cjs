module.exports = {
 env: {
  browser: true,
  es2021: true,
 },
 extends: [
  'airbnb',
  'airbnb/hooks',
  'plugin:react/recommended',
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
  'plugin:storybook/recommended',
 ],
 overrides: [],
 parser: '@typescript-eslint/parser',
 parserOptions: {
  ecmaVersion: 'latest',
  sourceType: 'module',
 },
 plugins: ['react'],
 rules: {
  'react/react-in-jsx-scope': 'off',
  'react/jsx-filename-extension': [
   'error',
   {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
   },
  ],
  'import/extensions': [
   'error',
   'ignorePackages',
   {
    js: 'never',
    jsx: 'never',
    ts: 'never',
    tsx: 'never',
    json: 'never',
    'd.ts': 'never',
   },
  ],
  'no-shadow': 'off',
  'import/prefer-default-export': 'off',
  'react/function-component-definition': [0, { namedcomponents: 'arrow-function' }],
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'react/prop-types': 'off',
  'react/require-default-props': 'off',
  'react/jsx-props-no-spreading': 'off',
 },
 settings: {
  react: {
   version: 'detect',
  },
  'import/parsers': {
   '@typescript-eslint/parser': ['.ts', '.tsx'],
  },
  'import/resolver': {
   node: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'd.ts'],
   },
   typescript: './tsconfig.json',
  },
 },
}
