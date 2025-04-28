import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

const isProduction = process.env.NODE_ENV === 'production';

const config = [
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
      js.configs.recommended,
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/stylistic', // Add stylistic rules
      'plugin:@typescript-eslint/recommended-type-checked', // Enable type-aware linting
    ],
    rules: {
      'react/jsx-no-target-blank': 'warn',
      'react-refresh/only-export-components': [
        isProduction ? 'error' : 'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off', // Let typescript handle this
      'no-console': isProduction ? 'warn' : 'off',
      'no-debugger': isProduction ? 'warn' : 'error',
      'eqeqeq': 'warn',
      'no-unused-expressions': 'warn',
      'sort-keys': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn', // Prevent unhandled promise rejections
      '@typescript-eslint/no-misused-promises': 'error', // Prevent using promises in wrong places
      '@typescript-eslint/restrict-template-expressions': 'warn', // Enforce template expression types
      '@typescript-eslint/no-unsafe-argument': 'warn', // Prevent unsafe arguments
      '@typescript-eslint/no-unsafe-assignment': 'warn', // Prevent unsafe assignments
      '@typescript-eslint/no-unsafe-call': 'warn', // Prevent unsafe calls
      '@typescript-eslint/no-unsafe-member-access': 'warn', // Prevent unsafe member access
      '@typescript-eslint/no-unsafe-return': 'warn', // Prevent unsafe returns
    },
  },
];

export default config;