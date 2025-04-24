import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Added TypeScript support
    languageOptions: {
      ecmaVersion: 'latest', // Use 'latest' directly
      globals: {
        ...globals.browser,
        // Add any custom globals here, e.g., process.env
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json', // Enable TypeScript parsing
        tsconfigRootDir: __dirname, // Ensure correct tsconfig resolution
      },
      parser: '@typescript-eslint/parser', // Specify the TypeScript parser
    },
    settings: { react: { version: 'detect' } }, // Use 'detect' for automatic version detection
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'), // Add TypeScript plugin
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended', // Add TypeScript recommended rules
    ],
    rules: {
      // Override or add rules here
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types
      '@typescript-eslint/no-explicit-any': 'warn', // Warn on using 'any' type
      '@typescript-eslint/no-unused-vars': 'warn', // Warn on unused variables
      'no-unused-vars': 'off', // Disable the base rule, as it's handled by @typescript-eslint/no-unused-vars
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Remove console.log in production
    },
  },
];