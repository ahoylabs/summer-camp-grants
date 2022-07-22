module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  globals: {
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
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
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:typescript-sort-keys/recommended',
        'prettier',
        'plugin:prettier/recommended',
      ],
      files: ['*.ts', '*.tsx'],
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
    'sort-keys': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/no-unescaped-entities': 'off',
  },
}
