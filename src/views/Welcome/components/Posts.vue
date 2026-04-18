<template>
  <Card>
    <template #title>
      <h1>✍🏽 Meus posts</h1>
    </template>
    <template #content>
      <q>
        Como desenvolvedor front-end, meu foco é construir interfaces de alta performance e extrair
        insights através de Web Analytics.
      </q>

      <div>
        <small>
          Acredito que a tecnologia deve ser intuitiva e engajadora, por isso, dedico parte do meu
          tempo a escrever e compartilhar conteúdo sobre minhas paixões: o código, os dados e a arte
          de dar vida a interfaces com animações.
        </small>
      </div>

      <Carousel
        :value="posts"
        :numVisible="6"
        :numScroll="6"
        :autoplay-interval="10000"
        circular
        :show-indicators="false"
      >
        <template #item="{ data: { quantity, name, link } }">
          <div>
            <div>{{ quantity }}</div>
            <div>
              <a :href="link">
                {{ name }}
              </a>
            </div>
          </div>
        </template>
      </Carousel>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import { items as links } from '../../../shared/links'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const posts = computed(() => {
  return links
    .map(({ text, link, items }) => {
      const quantity = items?.length || 0
      return {
        name: text,
        link,
        quantity,
      }
    })
    .filter(({ quantity }) => quantity > 0)
    .sort((a, b) => b.quantity - a.quantity)
})

const windowWidth = ref(0)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
section :deep(li) {
  margin-top: unset;
}

section :deep(ul) {
  list-style: none;
}

img {
  max-width: 100%;
  height: 2rem;
}

q {
  display: block;
  margin-block: 16px;
}
</style>
