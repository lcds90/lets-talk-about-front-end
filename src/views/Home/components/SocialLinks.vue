<template>
  <div class="flex justify-content-center">
    <a
      v-for="({ link, icon }, index) in links"
      :key="link"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      @mouseenter="playAnimation({ index, icon: icon as string })"
      @mouseleave="stopCurrentAnimation()"
      :ref="(el) => (iconRefs[index] = el as HTMLAnchorElement)"
    >
      <Button :icon="mapperIcons[icon as string]" rounded text plain class="social-button" />
    </a>
  </div>
</template>

<script setup lang="ts">
// O onBeforeUpdate não é mais necessário
import { ref } from 'vue'

import Button from 'primevue/button'
import { gsap } from 'gsap'

import { socialLinks } from '../../../shared/links'
import { useGreetings } from '../composables'
import { storeToRefs } from 'pinia'
const links = ref([...socialLinks])
const mapperIcons: Record<string, string> = {
  github: 'pi pi-github',
  linkedin: 'pi pi-linkedin',
  youtube: 'pi pi-youtube',
  gmail: 'pi pi-inbox',
}

// A ref continua sendo um array de elementos <a>.
// O Vue irá preenchê-la na ordem correta graças à atribuição por índice no template.
const iconRefs = ref<HTMLAnchorElement[]>([])
const { hoverMessage } = storeToRefs(useGreetings())
let activeTimeline: gsap.core.Timeline | null = null

// Toda a lógica de animação permanece EXATAMENTE A MESMA, pois ela
// já esperava um array de referências de elementos.
const playAnimation = ({ index, icon }: { index: number; icon: string }) => {
  if (activeTimeline) {
    activeTimeline.kill()
  }

  // Acessamos o ref da mesma forma: iconRefs.value[index]
  const iconElement = iconRefs.value[index]?.querySelector<HTMLElement>('.p-button-icon')
  if (!iconElement) return

  iconRefs.value.forEach((ref, i) => {
    if (i !== index && ref) {
      // Adicionamos uma checagem '&& ref' para segurança
      const otherIcon = ref.querySelector('.p-button-icon')
      if (otherIcon) gsap.set(otherIcon, { clearProps: 'all' })
    }
  })

  activeTimeline = gsap.timeline()

  activeTimeline.to(iconElement, {
    keyframes: [
      { rotation: -10 },
      { rotation: 10 },
      { rotation: -10 },
      { rotation: 10 },
      { rotation: 0 },
    ],
    duration: 0.5,
    ease: 'power2.inOut',
  })

  activeTimeline
    .to(iconElement, { rotate: 720, duration: 1, ease: 'power2.out' })
    .to(iconElement, { y: 0, duration: 0.8, ease: 'bounce.out' })

  activeTimeline.to(
    iconElement,
    {
      y: -3,
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'bounce',
    },
    '-=0.5'
  )

  hoverMessage.value = `Entre em contato via ${icon}!`
}

const stopCurrentAnimation = () => {
  if (activeTimeline) {
    activeTimeline.kill()
    activeTimeline = null
  }

  iconRefs.value.forEach((ref) => {
    if (ref) {
      // Checagem de segurança
      const icon = ref.querySelector('.p-button-icon')
      if (icon) {
        gsap.set(icon, { clearProps: 'all' })
      }
    }
  })
  hoverMessage.value = ''
}
</script>

<style scoped>
/* O CSS permanece o mesmo */
.social-link {
  text-decoration: none;
  padding: 0.25rem;
}
:deep(.social-button .p-button-icon) {
  font-size: 1.75rem;
  color: #c1c1c1;
  transform-origin: center center;
}

:deep(.p-button) {
  padding: 1.5rem;
}
</style>
