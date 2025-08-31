import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  { files: ['src/**/*.{js,mjs,cjs,ts,vue}'] },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  // 🔹 Adiciona Prettier ao ESLint
  { plugins: { prettier: pluginPrettier }, extends: [prettier] },
  { files: ['src/**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  // 🔹 Ativa Prettier como uma regra do ESLint
  {
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  { ignores: ['**/node_modules/**', '**/.vitepress/**'] },
])
