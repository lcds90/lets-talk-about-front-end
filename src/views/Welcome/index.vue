<script setup lang="ts">
// import gsap from 'gsap'
import { ref } from 'vue'
import { useGravatarProfile } from './composables'
import { Profile } from './components'
import AboutMe from './components/AboutMe.vue'
import Techs from './components/Techs.vue'
const container = ref<HTMLElement>()

const { profile } = useGravatarProfile()
</script>
<template>
  <main class="welcome-container" ref="container">
    <section class="align-column">
      <div class="sticky">
        <Profile :profile="profile" />
      </div>
    </section>
    <section class="align-column">
      <AboutMe />
      <Techs />
      <!-- <Card v-for="item in descriptions" :key="item.title" class="card-text">
        <h1>{{ item.title }}</h1>
        <p>{{ item.text }}</p>
      </Card> -->
    </section>
  </main>
</template>

<style scoped>
.welcome-container {
  margin: 0 auto;
  position: relative;
  grid-template-columns: 0.4fr 1fr;
  gap: 2rem;
  display: grid;
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
