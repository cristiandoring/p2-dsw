const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules, // Desativa conflitos com o Prettier
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-undef': 'error', // Pega variáveis não definidas
      'no-unused-vars': 'warn', // Alerta sobre variáveis não usadas
    },
  },
];
