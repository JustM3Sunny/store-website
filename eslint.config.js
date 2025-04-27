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
      js.configs.recommended, // Use the recommended config from @eslint/js
      'eslint:recommended', // Redundant, js.configs.recommended already includes this
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'react/jsx-no-target-blank': 'warn', // Changed to warn for better visibility
      'react-refresh/only-export-components': [
        isProduction ? 'error' : 'warn', // Promote to error in production
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off', // Let typescript handle this
      'no-console': isProduction ? 'warn' : 'off',
      'no-debugger': isProduction ? 'warn' : 'error', // Always error in production
      'eqeqeq': 'warn',
      'no-unused-expressions': 'warn',
      'sort-keys': 'off', // Disable sort-keys rule
      '@typescript-eslint/consistent-type-imports': 'warn', // Enforce consistent type imports
    },
  },
];

export default config;