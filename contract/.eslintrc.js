module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended', // should always be at the end
  ],
  ignorePatterns: [
    '**/docs/*.ts',
    '**/__generated__/**/*.ts',
    '**/dist/**',
    '**/node_modules/**',
    '**/.next/**',
  ],
  overrides: [
    {
      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:typescript-sort-keys/recommended',
        'prettier',
        'plugin:prettier/recommended',
      ],
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: { project: ['./tsconfig.eslint.json'] },
      plugins: ['typescript-sort-keys'],
      rules: {
        '@next/next/no-html-link-for-pages': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { tsconfigRootDir: __dirname },
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  root: true,
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
  },
}
