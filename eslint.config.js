import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        // Add any custom globals here, e.g., process.env
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      parser: typescriptEslintParser,
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      'no-console': isProduction ? 'warn' : 'off',
      // Add more specific rules as needed
      'no-debugger': isProduction ? 'warn' : 'off', // Remove debugger statements in production
      'eqeqeq': 'warn', // Enforce strict equality (=== and !==)
      'no-unused-expressions': 'warn', // Disallow unused expressions
    },
  },
];