<template>
  <div id="app">
    <Transition @enter="onEnter" @leave="onLeave" :css="false" mode="out-in">
      <Start v-if="!chatStarted" @toggle-chat="handleToggleChat" />
      <Chat v-else @toggle-chat="handleToggleChat" />
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { Chat, Start } from './views'
import { useGravatarProfile } from './composables'

// O controle de estado permanece o mesmo
const chatStarted = ref(false)
const gravatar = useGravatarProfile()
function handleToggleChat() {
  chatStarted.value = !chatStarted.value
}

// --- LÓGICA DA ANIMAÇÃO COM GSAP ---

// Função chamada quando o componente está SAINDO (neste caso, o Start)
// O Vue nos passa o elemento do DOM ('el') e uma função 'done' para ser chamada ao final.
function onLeave(el, done) {
  // Animação de saída: o perfil encolhe, move um pouco para baixo e desaparece.
  gsap.to(el, {
    opacity: 0,
    scale: 0.9,
    y: 40,
    duration: 0.4,
    ease: 'power2.in',
    // onComplete é ESSENCIAL: ele chama a função 'done' para avisar ao Vue que a animação terminou.
    onComplete: done,
  })
}

// Função chamada quando o novo componente está ENTRANDO (neste caso, o Chat)
function onEnter(el, done) {
  // Animação de entrada: o chat aparece vindo de baixo para cima e ganhando opacidade.
  // Usamos .from() que é perfeito para animações de entrada.
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.1, // Um pequeno atraso para garantir que a saída terminou completamente
    onComplete: done, // Novamente, avisamos ao Vue quando a animação de entrada termina.
  })
}

onMounted(async () => {
  await gravatar.fetchGravatarAPI()
})
</script>
