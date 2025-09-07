<template>
  <div class="flex typing" :class="{ 'justify-content-end': typing === 'user' }">
    <div class="flex align-items-end message-group">
      <Avatar
        v-if="typing === 'chatbot'"
        :image="messageAvatar"
        shape="circle"
        class="mr-2 message-avatar"
      />

      <!-- <div
        class="message-bubble"
        :class="{ sent: typing === 'user', received: typing === 'chatbot' }"
      >
        ...
      </div> -->
      <Tag severity="secondary" rounded class="typing-bubble">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </Tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  typing: 'user' | 'chatbot' | null
  avatar?: string
}

const messageAvatar = computed(() => (props?.avatar ? props.avatar : ''))
const props = defineProps<Props>()
defineEmits(['on-button-click'])
</script>

<style scoped>
/* Bolha de mensagem */
.message-bubble {
  border-radius: 12px;
  padding: 0.75rem;
}

:deep(.p-avatar) {
  display: none;
}

/* Bolha de mensagem enviada (direita) */
.message-bubble.sent {
  background-color: #e0d6ff; /* Roxo claro, como na imagem */
  color: #3b0764;
  max-width: 30rem;
  border-bottom-right-radius: 4px; /* Para dar o efeito de "cauda" */
}

/* Bolha de mensagem recebida (esquerda) */
.message-bubble.received {
  background-color: rgb(24, 24, 24);
  color: white;
  border: 1px solid #efefef;
  border-bottom-left-radius: 4px; /* Para dar o efeito de "cauda" */
}

.message-info {
  font-size: 0.75rem;
  margin-top: 4px;
  justify-content: flex-end;
}

.message-status {
  font-size: 0.7rem;
  color: #4caf50; /* Cor do "visto" */
}

/* Alinhamento dos grupos de mensagem */
.message-group {
  gap: 0.5rem;
}

.p-justify-end .message-group {
  flex-direction: row-reverse;
}

/* Imagens dentro das mensagens */
.message-image-container {
  margin-bottom: 5px;
  margin: 0 auto;
  max-width: 20rem;
}
:deep(.p-image-preview) {
  border-radius: 8px;
  max-width: 100%;
}
:deep(.p-image-preview img) {
  border-radius: 8px;
}

@media screen and (min-width: 768px) {
  .message-bubble {
    max-width: 50dvw;
    min-width: 30dvw;
  }

  :deep(.p-avatar) {
    display: block;
  }
}

.typing-bubble {
  padding-left: 12px;
  padding-right: 12px;
}

/* O estilo e a animação dos pontos permanecem os mesmos */
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #6c757d;
  margin: 0 3px;
  animation: bounce 1.3s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
