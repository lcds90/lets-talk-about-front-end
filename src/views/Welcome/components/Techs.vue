<template>
  <section>
    <h1>🧑‍💻 𝑫𝒆𝒔𝒆𝒏𝒗𝒐𝒍𝒗𝒆𝒅𝒐𝒓 𝒇𝒓𝒐𝒏𝒕 𝒆𝒏𝒅</h1>

    <p>
      📝Minha principal habilidade é o desenvolvimento front-end, atualmente estou na Zenvia,
      atuando diretamente com o desenvolvimento da aplicação em camada front-end e projetos
      relacionados a área de Web Analytics.
    </p>

    <Carousel
      :value="techsThatIUsed.technologies"
      :numVisible="6"
      :numScroll="6"
      :autoplay-interval="4000"
      circular
      :show-indicators="false"
      :show-navigators="false"
    >
      <template #item="slotProps">
        <div>
          <div>
            <img :src="slotProps.data.icon" :alt="slotProps.data.name" />
          </div>
          <div>{{ slotProps.data.name }}</div>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const techsThatIUsed = computed(() => ({
  title: '🔷 Stack de tecnologias que utilizo🔷',
  technologies: [
    {
      name: 'Vue',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
    },
    {
      name: 'Nuxt Js',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ494s97h7aVykAjvgNeKOGnjjgUPqCAP_BA&s',
    },
    {
      name: 'HTML',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png',
    },
    {
      name: 'CSS',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
    },
    {
      name: 'Javascript',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/960px-JavaScript-logo.png',
    },
    {
      name: 'GSAP',
      icon: 'https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png',
    },
    {
      name: 'Full Story',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9mCEjhuuFRsnGdyKxiKmeCYFj5JZ-rLKuhg&s',
    },
    {
      name: 'Google Analytics',
      icon: 'https://images.icon-icons.com/2699/PNG/512/google_analytics_logo_icon_171061.png',
    },
    {
      name: 'Google Tag Manager',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4cEQ_gB6ddnWefziMZ3MfPSZ_flEyVob_Ng&s',
    },
    {
      name: 'Node Js',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png',
    },
    {
      name: 'Jest',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5hv13xWYrg_Usxww9OTPx3FdKaIukCcCwrA&s',
    },
    {
      name: 'Firebase',
      icon: 'https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png?hl=pt-br',
    },
  ],
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const techsThatIKnow = computed(() => ({
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
}))

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
</style>
