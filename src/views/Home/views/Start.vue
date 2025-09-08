<template>
  <div class="profile-card-container">
    <div ref="profileCard" class="profile-card">
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
          :label="hasMessagesInHistory ? 'Iniciar conversa nova' : 'Iniciar Conversa'"
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

const continueConversation = () => {
  emit('toggle-chat')
}

const startConversation = () => {
  conversationsStore.resetMessages()
  emit('toggle-chat')
}
</script>

<style scoped>
.profile-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  padding: 2rem;
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
