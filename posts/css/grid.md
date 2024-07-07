# CSS Grid 🎨

::: info 🚀 O que é?
Prepare-se para mergulhar no mundo dos testes com Jest e Vue Test Utils. 🧪🖥️

Exploraremos a versatilidade em diferentes versões do Vue e vendo as diferenças da API! 💪🧪
:::

::: tip 🤔 Para que serve?
Testes unitários ajudam a identificar e corrigir bugs mais cedo, mantendo seu código robusto e confiável. 🐞✨
:::

<badge type="tip">#VueTesting</badge> <badge type="tip">#UnitTests</badge> <badge type="tip">#VueJS</badge>


## Configuração necessária

### 🔧 Comando Mágico:
Para iniciar os testes unitários, use o comando mágico
```json{6} [Scripts]
{
  "scripts": {
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "serve": "vue-cli-service serve",
    "test:unit": "vue-cli-service test:unit"
  },
}
```

### 📦 Dependências Necessárias:
Certifique-se de ter as seguintes dependências em seu pacote

- "vue": "^3.2.13" 🖼️
- "@types/jest": "^27.0.1" 🤖
- "@vue/cli-plugin-unit-jest": "~5.0.0" 🧪
- "@vue/test-utils": "^2.0.0-0" 🧰
- "@vue/vue3-jest": "^27.0.0-alpha.1" 🚀
- "jest": "^27.0.5" 🃏
- "ts-jest": "^27.0.4" 🎭

---

```bash
npm install vue@^3.2.13 --save \
  && npm install @types/jest@^27.0.1 @vue/cli-plugin-unit-jest@~5.0.0 @vue/test-utils@^2.0.0-0 @vue/vue3-jest@^27.0.0-alpha.1 --save-dev \
  && npm install jest@^27.0.5 ts-jest@^27.0.4 --save-dev
```

::: details Projeto base - package.json

::: code-group

```json [Arquivo]
{
  "name": "unit-testing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^1.6.1",
    "core-js": "^3.8.3",
    "vue": "^3.2.13",
    "vue-router": "^4.0.3"
  },
  "devDependencies": {
    "@types/jest": "^27.0.1",
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-typescript": "~5.0.0",
    "@vue/cli-plugin-unit-jest": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "@vue/eslint-config-typescript": "^9.1.0",
    "@vue/test-utils": "^2.0.0-0",
    "@vue/vue3-jest": "^27.0.0-alpha.1",
    "babel-jest": "^27.0.6",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.0.3",
    "jest": "^27.0.5",
    "prettier": "^2.4.1",
    "ts-jest": "^27.0.4",
    "typescript": "~4.5.5"
  }
}
```

```json{6} [Scripts]
{
  "scripts": {
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "serve": "vue-cli-service serve",
    "test:unit": "vue-cli-service test:unit"
  },
}
```

```json{5,9,16,19,20,26,28} [Bibliotecas]
{
  "dependencies": {
    "axios": "^1.6.1",
    "core-js": "^3.8.3",
    "vue": "^3.2.13",
    "vue-router": "^4.0.3"
  },
  "devDependencies": {
    "@types/jest": "^27.0.1",
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-typescript": "~5.0.0",
    "@vue/cli-plugin-unit-jest": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "@vue/eslint-config-typescript": "^9.1.0",
    "@vue/test-utils": "^2.0.0-0",
    "@vue/vue3-jest": "^27.0.0-alpha.1",
    "babel-jest": "^27.0.6",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.0.3",
    "jest": "^27.0.5",
    "prettier": "^2.4.1",
    "ts-jest": "^27.0.4",
    "typescript": "~4.5.5"
  }
}
```

:::

<!-- Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown). -->
  