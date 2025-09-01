<script setup lang="ts">
// import gsap from 'gsap'
import { ref } from 'vue'
import { useGravatarProfile } from './composables'
import { Profile } from './components'
import Experience from './components/Experience.vue'
import Posts from './components/Posts.vue'
const container = ref<HTMLElement>()

const { profile } = useGravatarProfile()
</script>
<template>
  <main class="welcome-container" ref="container">
    <Profile :profile="profile" />
    <Posts />
    <Experience />
  </main>
</template>

<style scoped>
.welcome-container {
  margin: 0 auto;
  position: relative;
  gap: 16px;
  display: flex;
  flex-direction: column;
}

.sticky {
  position: sticky;
  top: 15rem;
  background-color: rgb(58, 58, 58);
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8rem;
  white-space: pre-wrap;
}

.card-text h1 {
  font-size: 1.25rem;
  margin: unset;
  line-height: unset;
  text-align: center;
}

.card-text-greeting p {
  margin: unset;
  line-height: unset;
}
</style>
