<template>
  <div class="profile-card-container">
    <div class="video-background-container">
      <video
        class="video-background"
        v-show="!isGoingToChat"
        src="/Cenário_Galáctico_Gerado_para_Portfólio.mp4"
        autoplay
        loop
        muted
        playsinline
      ></video>
      <video
        class="video-background"
        v-show="isGoingToChat"
        src="/Cometa_Explodindo_Gerado_em_Vídeo.mp4"
        autoplay
        loop
        muted
        playsinline
      ></video>
      <div ref="fragmentsContainer" class="fragments-container"></div>

      <div ref="profileCard" class="content-overlay">
        <div class="profile-card">
          <div ref="profileAvatar">
            <Avatar :image="profile.img" size="xlarge" shape="circle" />
          </div>

          <div class="profile-info">
            <h2 ref="profileName">{{ profile.display_name }}</h2>
            <div ref="profileDescription" class="description">
              <p>
                {{ getGreeting }}
              </p>
              <Transition
                @enter="onEnterHoverMessage"
                @leave="onLeaveHoverMessage"
                :css="false"
                mode="out-in"
              >
                <p class="hover-message" ref="profileHoverMessage" v-if="hoverMessage">
                  {{ hoverMessage }}
                </p>
              </Transition>
              <SocialLinks class="my-3 gap-3" />
            </div>
          </div>

          <div ref="profileCta">
            <Button
              :label="hasMessagesInHistory ? 'Iniciar conversa nova' : 'Iniciar conversa'"
              icon="pi pi-comments"
              severity="secondary"
              @click="startConversation"
            />
          </div>
          <div ref="profileContinue" v-if="hasMessagesInHistory">
            <Button
              label="Continuar conversa anterior"
              icon="pi pi-comments"
              severity="secondary"
              @click="continueConversation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

// Importando componentes do PrimeVue
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import { useConversations, useGravatarProfile, useGreetings } from '../composables'
import { storeToRefs } from 'pinia'
import SocialLinks from '../components/SocialLinks.vue'

// Refs para "conectar" o script aos elementos do template
const profileCard = ref(null)
const profileAvatar = ref(null)
const profileName = ref(null)
const profileDescription = ref(null)
const profileCta = ref(null)
const profileContinue = ref(null)
const profileHoverMessage = ref(null)
const isGoingToChat = ref(false)
const emit = defineEmits(['toggle-chat'])

const { profile } = storeToRefs(useGravatarProfile())
const conversationsStore = useConversations()
const { hasMessagesInHistory } = storeToRefs(conversationsStore)

const { getGreeting, hoverMessage } = storeToRefs(useGreetings())
// onMounted garante que o código de animação só rode quando o componente estiver na tela
onMounted(() => {
  // Configuração inicial dos elementos (invisíveis e fora de posição)
  // Isso previne um "flash" do conteúdo antes da animação começar
  gsap.set(
    [
      profileAvatar.value,
      profileName.value,
      profileDescription.value,
      profileCta.value,
      profileContinue.value,
      profileHoverMessage.value,
    ],
    { opacity: 0, y: 30 } // y: 30 move os elementos 30px para baixo
  )
  gsap.set(profileCard.value, { opacity: 0, scale: 0.95 })

  // Criação da Timeline de animação do GSAP
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // A animação acontece em sequência (stagger)
  tl.to(profileCard.value, { opacity: 1, scale: 1, duration: 0.5 })
    .to(profileAvatar.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2') // Inicia um pouco antes da animação anterior terminar
    .to(profileName.value, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
    .to(profileDescription.value, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
    .to(profileCta.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to(profileContinue.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
})

const onEnterHoverMessage = (el, done) => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.1, // Um pequeno atraso para garantir que a saída terminou completamente
    onComplete: done, // Novamente, avisamos ao Vue quando a animação de entrada termina.
  })
}
const onLeaveHoverMessage = (el, done) => {
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

watch(hoverMessage, () => {}, { deep: true })

// const animateToggle = () => {
//   videoPlaying.value = 'public/Cometa_Explodindo_Gerado_em_Vídeo.mp4'
//   const tl = gsap.timeline({
//     defaults: { ease: 'power3.out' },
//     onComplete: () => {
//       emit('toggle-chat')
//     },
//   })

//   // A animação acontece em sequência (stagger)
//   tl.to(profileCard.value, { opacity: 0, scale: 0, duration: 6, yoyo: true })
// }

// Seus refs e emits
const fragmentsContainer = ref(null)

/**
 * Cria uma grade de divs (fragmentos) sobre um elemento específico.
 * @param {HTMLElement} element O elemento a ser fragmentado.
 * @param {HTMLElement} container O contêiner onde os fragmentos serão adicionados.
 * @param {number} rows Número de linhas da grade.
 * @param {number} cols Número de colunas da grade.
 */
const createFragments = (element, container, rows = 10, cols = 10) => {
  // Limpa fragmentos antigos
  container.innerHTML = ''

  const rect = element.getBoundingClientRect()
  const fragmentWidth = rect.width / cols
  const fragmentHeight = rect.height / rows

  // Cria um clone visual do elemento para usar como background
  const elementClone = element.cloneNode(true)
  document.body.appendChild(elementClone)
  // Lógica para capturar o estilo visual (pode ser complexo, uma cor de fundo é mais simples)
  const style = window.getComputedStyle(element)
  const backgroundColor = style.backgroundColor
  document.body.removeChild(elementClone)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const fragment = document.createElement('div')
      fragment.style.width = `${fragmentWidth}px`
      fragment.style.height = `${fragmentHeight}px`
      fragment.style.position = 'absolute'
      fragment.style.left = `${j * fragmentWidth}px`
      fragment.style.top = `${i * fragmentHeight}px`
      fragment.style.background = backgroundColor
      // Para um efeito mais avançado, você poderia usar background-position
      // para cada fragmento mostrar uma parte do conteúdo original.

      container.appendChild(fragment)
    }
  }
}

const animateToggle = () => {
  if (!profileCard.value || !fragmentsContainer.value) return

  isGoingToChat.value = true

  // Passo 1: Posicionar o contêiner de fragmentos e criar os fragmentos
  const cardRect = profileCard.value.getBoundingClientRect()
  gsap.set(fragmentsContainer.value, {
    position: 'absolute',
    left: cardRect.left,
    top: cardRect.top,
    width: cardRect.width,
    height: cardRect.height,
    pointerEvents: 'none', // Impede que o container intercepte cliques
  })

  createFragments(profileCard.value, fragmentsContainer.value, 10, 10)

  // Passo 2: Esconder o card original
  gsap.to(profileCard.value, { opacity: 0 })

  const fragments = Array.from(fragmentsContainer.value.children)

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      fragmentsContainer.value.innerHTML = ''
      emit('toggle-chat')
    },
  })

  // Passo 3: A animação de explosão dos fragmentos
  tl.to(fragments, {
    duration: 3, // Duração da explosão
    x: () => gsap.utils.random(-300, 300, 50), // Move para uma posição X aleatória
    y: () => gsap.utils.random(-400, 400, 50), // Move para uma posição Y aleatória
    rotation: () => gsap.utils.random(-720, 720), // Gira aleatoriamente
    scale: 0, // Diminui até desaparecer
    opacity: 0,
    // O 'stagger' é a mágica aqui!
    stagger: {
      each: 0.02, // Pequeno atraso entre o início da animação de cada fragmento
      from: 'center', // A animação começa nos fragmentos do centro e vai para as bordas
    },
  })
}

const continueConversation = () => {
  animateToggle()
}

const startConversation = () => {
  conversationsStore.resetMessages()
  animateToggle()
}
</script>

<style scoped>
.fragments-container {
  overflow: hidden; /* Garante que os fragmentos fiquem dentro dos limites iniciais */
}

.profile-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

.video-background-container {
  position: relative; /* Base para o posicionamento absoluto do vídeo */
  height: 100vh; /* Ocupa 100% da altura da tela */
  width: 100%;
  overflow: hidden; /* Garante que nada saia dos limites */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* Cor do texto para contrastar com o vídeo */
}

/* Estilização do vídeo */
.video-background {
  position: absolute; /* Remove o vídeo do fluxo normal da página */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  /* ADICIONAR ESTA LINHA PARA O BLUR */
  /* filter: blur(2px); Ajuste o valor (ex: 3px, 8px) para o desfoque desejado */
  /* Isso é importante para evitar que a borda do blur seja visível */
  transform: scale(1.02);
}

/* Camada de conteúdo */
.content-overlay {
  /* position: relative; (Opcional, mas bom para garantir o contexto de empilhamento) */
  z-index: 1; /* Garante que o conteúdo fique na frente */
  text-align: center;
  padding: 20px;
  /* Adiciona uma sobreposição escura para melhorar a legibilidade do texto */
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  box-shadow: 0 2px 2px 2px rgba(10, 10, 10, 0.75);
}

.profile-card {
  /* Layout e espaçamento */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* Espaço entre os elementos filhos */

  /* Estilo do cartão */
  background-color: #2a2a2e; /* Cor escura, como na referência */
  color: #f0f0f0;
  padding: 3rem 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  /* Prepara o componente para a animação de escala */
  transform-origin: center;
}

.profile-info {
  text-align: center;
}

.profile-info h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.description {
  margin: 0.25rem 0 0 0;
  font-size: 1rem;
  color: #b0b0b0; /* Cor secundária para a descrição */
  position: relative;
}

.hover-message {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

/* Aumenta um pouco o tamanho do avatar "xlarge" padrão */
:deep(.p-avatar-xlarge) {
  width: 100px;
  height: 100px;
  font-size: 4rem;
}
</style>
