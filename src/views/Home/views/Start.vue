<template>
  <div class="profile-card-container">
    <div ref="profileCard" class="profile-card">
      <div ref="profileAvatar">
        <Avatar image="https://i.pravatar.cc/150?u=katherine" size="xlarge" shape="circle" />
      </div>

      <div class="profile-info">
        <h2 ref="profileName">Leonardo Santos</h2>
        <p ref="profileDescription" class="description">Desenvolvedor Front-end</p>
      </div>

      <div ref="profileCta">
        <Button
          label="Iniciar Conversa"
          icon="pi pi-comments"
          severity="secondary"
          @click="startConversation"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// Importando componentes do PrimeVue
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

// Refs para "conectar" o script aos elementos do template
const profileCard = ref(null)
const profileAvatar = ref(null)
const profileName = ref(null)
const profileDescription = ref(null)
const profileCta = ref(null)
const emit = defineEmits(['start-chat'])
// onMounted garante que o código de animação só rode quando o componente estiver na tela
onMounted(() => {
  // Configuração inicial dos elementos (invisíveis e fora de posição)
  // Isso previne um "flash" do conteúdo antes da animação começar
  gsap.set(
    [profileAvatar.value, profileName.value, profileDescription.value, profileCta.value],
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
})

const startConversation = () => {
  // Dispara o evento 'start-chat' para o componente pai
  emit('start-chat')
}
</script>

<style scoped>
.profile-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
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
}

/* Aumenta um pouco o tamanho do avatar "xlarge" padrão */
:deep(.p-avatar-xlarge) {
  width: 100px;
  height: 100px;
  font-size: 4rem;
}
</style>
