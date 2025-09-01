<template>
  <div class="tech-stack-container">
    <div v-for="stack in techStacks" :key="stack.title" class="stack-section">
      <h2>{{ stack.title }}</h2>
      <Carousel
        :value="stack.technologies"
        :numVisible="calculateNumVisible()"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        containerClass="w-full"
      >
        <template #item="slotProps">
          <div class="tech-item p-4 m-2 flex flex-col items-center justify-center">
            <div
              class="tech-icon-wrapper rounded-lg w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors duration-300"
              v-tooltip="slotProps.data.name"
            >
              <div class="tech-icon text-5xl">
                {{ slotProps.data.icon }}
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const techStacks = ref([
  {
    title: '🔷 Stack de tecnologias que utilizo🔷',
    technologies: [
      { name: 'Vue', icon: 'logos:vue' },
      { name: 'Nuxt Js', icon: 'logos:nuxt-icon' },
      { name: 'HTML', icon: 'logos:html-5' },
      { name: 'CSS', icon: 'logos:css-3' },
      { name: 'Javascript', icon: 'logos:javascript' },
      { name: 'GSAP', icon: 'simple-icons:greensock' },
      { name: 'Full Story', icon: 'logos:fullstory' },
      { name: 'Google Analytics', icon: 'logos:google-analytics' },
      { name: 'Google Tag Manager', icon: 'logos:google-tag-manager' },
      { name: 'Node Js', icon: 'logos:nodejs-icon' },
      { name: 'Jest', icon: 'logos:jest' },
      { name: 'Vue Test Utils', icon: 'logos:vue' },
      { name: 'Firebase', icon: 'logos:firebase' },
    ],
  },
  {
    title: '🚀 Possuo conhecimentos',
    technologies: [
      { name: 'Angular Js', icon: 'logos:angular-icon' },
      { name: 'Gatsby', icon: 'logos:gatsby' },
      { name: 'React', icon: 'logos:react' },
      { name: 'Next', icon: 'logos:nextjs-icon' },
      { name: 'Stencil JS', icon: 'logos:stencil' },
      { name: 'PHP', icon: 'logos:php' },
      { name: 'Java', icon: 'logos:java' },
      { name: 'C#', icon: 'logos:c-sharp' },
      { name: 'Python', icon: 'logos:python' },
      { name: 'Cypress', icon: 'logos:cypress' },
      { name: 'SQL', icon: 'carbon:sql' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' },
      { name: 'SQL Server', icon: 'simple-icons:microsoftsqlserver' },
    ],
  },
])

const responsiveOptions = ref([
  {
    breakpoint: '1199px',
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: '991px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1,
  },
])

const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const calculateNumVisible = () => {
  if (windowWidth.value < 768) {
    return 2
  }
  if (windowWidth.value < 992) {
    return 3
  }
  if (windowWidth.value < 1200) {
    return 4
  }
  return 5
}
</script>

<style scoped>
.tech-stack-container {
  font-family: 'Inter', sans-serif;
  padding: 2rem;
}

.stack-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
  /* dark:text-white */
}

.tech-item {
  text-align: center;
}
</style>
