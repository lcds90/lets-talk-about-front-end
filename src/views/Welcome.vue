<script setup lang="ts">
import gsap from 'gsap'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Card } from '../components'
/* 	import { YoutubeIframe } from '@vue-youtube/component';
 */
import axios from 'axios'

interface Profile {
  alt: string
  img: string
  hash: string
  display_name: string
  profile_url: string
  avatar_url: string
  avatar_alt_text: string
  location: string
  description: string
  job_title: string
  company: string
  verified_accounts: {
    service_label: string
    service_icon: string
    url: string
  }[]
  pronunciation: string
  pronouns: string
  background_color: string
}

const info = ref<Profile>({
  alt: 'Foto de Leonardo Santos',
  img: 'https://1.gravatar.com/avatar/5124d1a8dc6b90c0001689ede9f4e4b56ddf0236c0fd2737dd4d3248d955edc8?s=400',
  hash: '',
  display_name: '',
  profile_url: '',
  avatar_url: '',
  avatar_alt_text: '',
  location: '',
  description: '',
  job_title: '',
  company: '',
  verified_accounts: [],
  pronunciation: '',
  pronouns: '',
  background_color: '',
})

const getProfile = async () => {
  const apiURL = 'https://api.gravatar.com/v3'

  try {
    const response = await axios.get(`${apiURL}/profiles/lcds90`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GRAVATAR_TOKEN}`,
      },
    })
    info.value = {
      alt: 'Foto de Leonardo Santos',
      img: `${response.data.avatar_url}?s=400`,
      ...response.data,
    }
  } catch (error) {
    console.error(error)
  }
}

const container = ref<HTMLElement>()

const getGreeting = computed(() => {
  type Times = 'default' | 'morning' | 'afternoon' | 'night'
  const messages: Record<Times, string> = {
    afternoon: 'Boa tarde',
    morning: 'Bom dia',
    night: 'Boa noite',
    default: 'Seja bem vindo',
  }

  const d = new Date()
  const hour = d.getHours()

  let time: Times = 'default'
  if (hour < 12 && hour >= 6) time = 'morning'
  if (hour > 12 && hour < 18) time = 'afternoon'
  if (hour > 18 && hour < 24) time = 'night'

  return messages[time]
})

const animateLine = () => {
  if (!container.value) return
  gsap
    .timeline({
      yoyo: true,
      repeat: 2,
      defaults: { duration: 1, stagger: 1, ease: 'expo.out' },
    })
    .to(container.value.querySelectorAll('hr'), {
      width: '0%',
    })
    .to(container.value.querySelectorAll('hr'), {
      width: '100%',
    })
}

const animatedH1 = () => {
  if (!container.value) return
  gsap
    .timeline({
      yoyo: true,
      repeat: -1,
      defaults: { duration: 2, ease: 'bounce.inOut' },
    })
    .to(container.value.querySelectorAll('h1'), {
      fontSize: '1.25rem',
      // 'text-shadow': '0 0 30px rgba(255, 255, 255, 0.05)',
    })
    .to(container.value.querySelectorAll('h1'), {
      fontSize: '1.5rem',
      // 'text-shadow': '0 0 100px rgba(255, 255, 255, 0.25)',
    })
}

const fadeoutCard = () => {
  if (!container.value) return
  const targets = {
    img: container.value.querySelector('.media-photo'),
    cardContent: container.value.querySelectorAll('.card-text'),
    title: container.value.querySelector('#greeting'),
  }

  gsap
    .timeline({
      defaults: { duration: 2 },
      onComplete: () => {
        animateLine()
        animatedH1()
        gsap.set(Object.values(targets), { clearProps: true })
      },
    })
    .from(targets.title, { y: -200, rotate: -50, ease: 'expo' })
    .from(
      targets.img,
      {
        width: 0,
        x: -200,
      },
      '-=1.75'
    )
    .from(
      targets.cardContent,
      {
        scale: 0.5,
        opacity: 0,
      },
      '-=1'
    )
}

const descriptionSplit = computed(() => {
  const descriptions = info.value.description.split('\n\n')
  const descriptionWithTitle = descriptions.map((description) => {
    const title = description.split('\n')[0]
    const text = description.split('\n').slice(1).join('\n')
    return { title, text }
  })
  return descriptionWithTitle
})

onMounted(async () => {
  await getProfile()
  fadeoutCard()
  const style = document.createElement('style')
  style.id = 'welcome-style'
  style.innerHTML = `
      .VPDoc {
        padding: 32px 24px 0 !important;
      }

      @media screen and (min-width: 960px) {
        .container div.content {
          padding-bottom: 0 !important;
        }
      }
    `
  document.head.appendChild(style)
})

onBeforeUnmount(() => {
  const style = document.getElementById('welcome-style')
  if (style) style.remove()
})
</script>
<template>
  <main class="welcome-container" ref="container">
    <section class="align-column">
      <Card id="card" class="sticky">
        <article class="media-container">
          <div class="media-photo">
            <img :alt="info.alt" :src="info.img" />
          </div>
        </article>
        <hr class="line" />
        <article class="card-text-greeting">
          <p id="greeting" class="title">
            {{ getGreeting }}
          </p>

          <p>
            Eu sou <b>{{ info.display_name }}</b>
          </p>
        </article>
      </Card>
    </section>
    <section class="align-column">
      <Card v-for="item in descriptionSplit" :key="item.title" class="card-text">
        <h1>{{ item.title }}</h1>
        <p>{{ item.text }}</p>
      </Card>
    </section>
  </main>
</template>

<style scoped>
.welcome-container {
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.line {
  color: #ccc;
  background-color: #ccc;
  height: 1px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  border: none;
}

.media-container {
  display: flex;
  place-items: center;
  justify-content: center;
  align-items: center;
}

.media-photo {
  width: 100px;
  z-index: 10;
  border: 3px solid #ccc;
  border-radius: 2rem;
}

.media-photo img {
  width: 100%;
  border-radius: 2rem;
}

.sticky {
  position: sticky;
  top: 15rem;
  background-color: rgb(58, 58, 58);
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.align-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
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

@media screen and (min-width: 960px) {
  .card-text-greeting {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
  .welcome-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

<!-- <style>
.VPDoc {
  padding: 32px 24px 0 !important;
}

@media screen and (min-width: 960px) {
  .container div.content {
    padding-bottom: 0 !important;
  }
}
</style> -->
