import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Padrões ignorados globalmente
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/generated/**',
      '**/.pnpm-store/**',
      '**/coverage/**',
    ],
  },

  // Regras base JavaScript
  js.configs.recommended,

  // Regras TypeScript
  ...tseslint.configs.recommended,

  // Customizações globais
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
