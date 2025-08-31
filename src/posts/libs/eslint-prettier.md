# 💼 ESLint e Prettier com Vitepress

::: info 🚀 O que é
São ferramentas de qualidade de código que ajudar a garantir que o código seja escrito de maneira consistente!
:::

## Eslint

A ferramenta ESLint e uma ferramenta de qualidade de código que ajudar a garantir que o código seja escrito de maneira consistente, evitando erros e melhorando a qualidade geral do código.

## Prettier

A ferramenta Prettier e uma ferramenta de qualidade de código que ajudar a garantir que o código seja escrito de maneira consistente, evitando erros e melhorando a qualidade geral do código.

---

::: tip 🛠️ Como configurar no projeto
Agora vamos configurar o ESLint e o Prettier no projeto Vitepress.
:::

```bash{6}
npm init @eslint/config@latest
```

Isso irá criar um arquivo de configuração .eslintrc.js no diretório raiz do seu projeto. O arquivo .eslintrc.config.js pode ser editado para incluir as configurações desejadas para o ESLint.

Para configurar o prettier

```bash{6}
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier jiti
```

Configure o .prettierc.json

```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Configurando o eslint.config.ts

```typescript
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
// ⚠️ Após adicionar o prettier, acrescente
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
  // 🔸 Regras adicionais são configuradas aqui
  {
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  { ignores: ['**/node_modules/**', '**/.vitepress/**'] },
])
```

### Adicionando o eslint com prettier ao Vitepress

```typescript
import { defineConfig } from 'vitepress'
/* @ts-ignore */
import eslint from 'vite-plugin-eslint'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Mova os arquivos e defina o srcDir para src
  srcDir: 'src',
  vite: {
    plugins: [eslint({})],
  },
})
```

Adicione ao seu package-json

```json
{
    "lint": "eslint --ext .ts,.vue --fix",
    "format": "prettier .  --write"
}
```

Referências:
- [Confiuguration Files - Eslint](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier](https://prettier.io/docs/)