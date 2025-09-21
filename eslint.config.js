import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
    // Игнорируемые файлы
    {
        ignores: [
            'node_modules/**',
            'build/**',
            'dist/**',
            '.react-router/**',
            'public/**',
            '*.config.js',
            '*.config.ts',
            'vite.config.ts',
            'tailwind.config.js',
            'react-router.config.ts',
        ],
    },

    // Базовые правила
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // Общие настройки
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                fetch: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: '19.1.0',
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    },

    // Конфигурация для TypeScript и React файлов
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            import: importPlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            // Базовые правила (форматирование отдано Prettier)
            'no-debugger': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            eqeqeq: ['error', 'always'],

            // TypeScript правила
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',

            // React правила
            'react/react-in-jsx-scope': 'off', // React 17+ не требует импорта React
            'react/prop-types': 'off', // TypeScript заменяет prop-types
            'react/jsx-uses-react': 'off',
            'react/jsx-uses-vars': 'error',
            'react/jsx-key': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-pascal-case': 'error',
            'react/no-children-prop': 'error',
            'react/no-deprecated': 'error',
            'react/no-unescaped-entities': 'error',
            'react/no-unknown-property': 'error',
            'react/self-closing-comp': 'error',

            // React Hooks правила
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',

            // React Refresh правила (для Vite)
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // Import правила
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-unused-modules': 'off',
            'import/no-duplicates': 'error',
            'import/newline-after-import': 'error',
            'unused-imports/no-unused-imports': 'warn',
        },
    },

    // Prettier конфигурация (должна быть последней)
    prettierConfig,
);
