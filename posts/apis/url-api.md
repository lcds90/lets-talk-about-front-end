---
outline: [2, 4]
---
<script setup>
import { SeeVideos } from '../../components'
</script>

# 🔍 URL API 🔍

## ✨ Contexto

Esse post serve para abordagem sobre URLs

<see-videos />

## ℹ️ URL Search Params

### 🚀 O que é?
::: info O URLSearchParams é uma interface que facilita a manipulação de parâmetros na string de consulta (query string) de uma URL. 🌐🔧
:::

Ele faz parte do conjunto de Web Workers

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
