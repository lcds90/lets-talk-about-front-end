---
outline: [2, 4]
---
<script setup>
import { SeeVideos, URLExample } from '../../components'
</script>
<!--  LINK https://medium.com/@natanmerelles/como-contribuir-na-tradu%C3%A7%C3%A3o-de-conte%C3%BAdos-do-mdn-web-docs-34b110b1cc49 -->

# ℹ️ URL API

## ✨ Contexto

Nesse post vamos abordar sobre as API de `URL` e `URLSearchParams`

<see-videos />

---

A API de URL oferece um [padrão válido](https://developer.mozilla.org/pt-BR/docs/Glossary/URL) para manipular, ajudando também a definir conceitos como domínios, hosts e endereços IP, e descrever de maneira padronizada o tipo MIME legado `application/x-www-form-urlencoded` usado para enviar o conteúdo de formulários da web como um conjunto de pares chave/valor.

::: details Definição de URL
A maior parte do padrão de URL é dedicada à definição de uma URL e como ela é estruturada e analisada.

:::

> O que mais interessa à maioria dos desenvolvedores, no entanto, é a própria API.


## 🔗 URL

### 🚀 O que é?
::: info Interface URL
Fornece uma maneira simples de trabalhar com URLs em JavaScript.
O intuito é construir, analisar e modificar URLs de forma dinâmica! 
:::

### 🤔 Para que serve?
::: tip Decompõe URLs em partes
Sendo possível manipular essas propriedades de maneira prática, facilitando a construção de URLs dinâmicas e confiáveis.
:::

---

Toda vez que considerar lidar com URLs, forneça essa opção pois houvendo a necessidade de manipular as suas propriedades, logo saberemos lidar de forma mais precavida com cenários.

<URLExample />

## 🔍 URL Search Params

### 🚀 O que é?
::: info O URLSearchParams é uma interface que facilita a manipulação de parâmetros na string de consulta (query string) de uma URL. 🌐🔧
:::


### 🤔 Para que serve?
::: tip O URLSearchParams permite que você manipule parâmetros de URL de maneira eficiente, seja para construir links dinâmicos, coletar dados de formulários ou melhorar a experiência do usuário na web. 🌟✍️
:::

const mapperParams = computed(() => {
  const mapperParams = {
    loop: isRepeatedly ? '1' : '0',
    autoplay: isAutoPlay ? '1' : '0'
    /*     showControls: showControls ? 'controls=1' : 'controls=0',
    showProgressBar: showProgressBar ? 'progress_bar=1' : 'progress_bar=0',
    showPlay: showPlay ? 'play_button=1' : 'play_button=0',
    showVolumeControl: showVolumeControl ? 'volume_control=1' : 'volume_control=0',
    showFullscreen: showFullscreen ? 'fullscreen_button=1' : 'fullscreen_button=0',
    showTimestamp: showTimestamp ? 'timestamp=1' : 'timestamp=0',
    showMusicInfo: showMusicInfo ? 'music_info=1' : 'music_info=0',
    showDescription: showDescription ? 'description=1' : 'description=0',
    showRelatedVideos: showRelatedVideos ? 'rel=1' : 'rel=0',
    showNativeContextMenu: showNativeContextMenu ? 'native_context_menu=1' : 'native_context_menu=0' */
  }
  return new URLSearchParams(mapperParams)
})


## Referências

- https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
