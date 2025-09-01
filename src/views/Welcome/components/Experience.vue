<script setup lang="ts">
import Panel from 'primevue/panel'
import Timeline from 'primevue/timeline'
import { computed } from 'vue'

// FAZER O CURRICULO COM ANOS - JUNIOR, PLENO, ETC E EXPLICANDO SOBRE FEITOS
const timelineFrontEnd = computed(() => [
  {
    experience: 'Construção de protótipos realizados em aplicações como Figm',
    icon: 'fa-figma',
  },
  {
    experience: 'Frameworks como Vue 2 e Vue 3, e agnóstico como Stencil Js. ',
    icon: 'fa-vue',
  },
  {
    experience: 'Manipulação com bibliotecas de construção de diagramas complexos. ',
    icon: 'fa-diagram',
  },
  {
    experience: 'Planejamento, construção na coleta de dados para ferramentas analíticas.',
    icon: 'fa-figma',
  },
  {
    experience: 'Atuando com APIs construídas sob o conceito de BFFs.',
    icon: 'fa-figma',
  },
  {
    experience: 'CI/CD de Jenkins',
    icon: 'fa-figma',
  },
  {
    experience: 'Arquitetura de micro frontends como o single-SPA.',
    icon: 'fa-figma',
  },
  {
    experience: 'Google Analytics 4: Implementação e configuração de organização',
    icon: 'fa-ga',
  },
  {
    experience: 'Google Tag Manager: Implementação e configuração de implementação enviada',
    icon: 'fa-tag',
  },
  {
    experience:
      'FullStory: Configuração de organizações, implementação, traqueamento de informações',
    icon: 'fa-fs',
  },
])
</script>

<template>
  <section>
    <Panel toggleable collapsed>
      <template #header>
        <h3>✨ Minha experiência com tecnologia</h3>
      </template>
      <article>
        <Timeline :value="timelineFrontEnd" align="alternate">
          <template #marker="slotProps">
            <span>
              {{ slotProps.item.icon }}
              <i :class="slotProps.item.icon"></i>
            </span>
          </template>
          <template #content="slotProps">
            {{ slotProps.item.experience }}
          </template>
        </Timeline>
      </article>
    </Panel>
  </section>
</template>

<style scoped>
section :deep(h3) {
  margin-top: 0;
}
</style>
