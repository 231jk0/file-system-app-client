import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: [ 'dist' ] },
	{
		extends: [ js.configs.recommended, ...tseslint.configs.recommended ],
		files: [ '**/*.{ts,tsx,js}' ],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@stylistic': stylistic,
			'react': reactPlugin,
			'import': importPlugin,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': 'off',
			'@stylistic/no-extra-semi': 'warn',
			'keyword-spacing': [
				'warn',
				{
					'before': true,
					'after': true,
				},
			],
			'@typescript-eslint/no-unused-expressions': 'off',
			'@stylistic/brace-style': [ 'warn' ],
			'@stylistic/curly-newline': [ 'warn', 'always' ],
			'@stylistic/multiline-ternary': [ 'warn', 'always-multiline' ],
			// 'react/jsx-curly-newline': [ 'warn', { 'multiline': 'require', 'singleline': 'require' } ],
			'@stylistic/semi-spacing': 'warn',
			'@stylistic/space-before-blocks': 'warn',
			'@stylistic/space-infix-ops': 'warn',
			'@stylistic/arrow-spacing': 'warn',
			'@stylistic/no-mixed-spaces-and-tabs': 'warn',
			'@stylistic/keyword-spacing': [
				'warn', {
					before: true,
					after: true,
				},
			],
			'object-curly-spacing': [ 'warn', 'always' ],
			'@typescript-eslint/no-unused-vars': [ 'warn' ],
			'@typescript-eslint/no-explicit-any': 'warn',
			'indent': [ 'warn', 'tab' ],
			'array-bracket-newline': [ 'warn', { multiline: true } ],
			'array-bracket-spacing': [
				'warn',
				'always',
			],
			'arrow-parens': [ 'warn', 'as-needed' ],
			'comma-dangle': [ 'warn', 'always-multiline' ],
			'key-spacing': [
				'warn', {
					afterColon: true,
					beforeColon: false,
					mode: 'strict',
				},
			],
			'no-multi-spaces': [ 'warn' ],
			'no-multiple-empty-lines': [
				'warn', {
					max: 1,
					maxBOF: 0,
					maxEOF: 0,
				},
			],
			'no-trailing-spaces': 'warn',
			'object-curly-newline': [
				'warn', {
					'ExportDeclaration': { 'multiline': true },
					'ObjectExpression': { 'multiline': true },
					'ObjectPattern': { 'multiline': true },
				},
			],
			'object-property-newline': [
				'warn',
				{ 'allowAllPropertiesOnSameLine': false },
			],
			'padding-line-between-statements': [
				'warn',
				{
					blankLine: 'always',
					next: 'return',
					prev: '*',
				},
			],
			'quotes': [ 'warn', 'single' ],
			'react/jsx-closing-bracket-location': [ 'warn', 'tag-aligned' ],
			'react/jsx-closing-tag-location': [ 'warn', 'line-aligned' ],
			'react/jsx-first-prop-new-line': [ 'warn', 'multiline' ],
			'react/jsx-max-props-per-line': [
				'warn', {
					'maximum': 1,
					'when': 'always',
				},
			],
			'react/jsx-sort-props': [
				'warn', {
					'callbacksLast': true,
					'ignoreCase': false,
					'noSortAlphabetically': false,
					'reservedFirst': true,
					'shorthandFirst': true,
				},
			],
			'semi': [ 'warn', 'always' ],
			'import/order': [
				'warn', // or 'error'
				{
					groups: [
						'builtin', // Built-in modules (e.g., `fs`, `path`)
						'external', // External modules (e.g., `react`, `lodash`)
						'internal', // Internal modules (local imports)
						'parent', // Parent imports (e.g., `../something`)
						'sibling', // Sibling imports (e.g., `./something`)
						'index', // Index imports (e.g., `./`)
					],
					'newlines-between': 'always', // Enforce newlines between groups
					'alphabetize': {
						order: 'asc', // Sort imports alphabetically
						caseInsensitive: true, // Case insensitive sorting
					},
				},
			],
			'@typescript-eslint/no-empty-object-type': 'off',
		},
		// '@typescript-eslint/no-explicit-any': ['warn'],
	},
);
