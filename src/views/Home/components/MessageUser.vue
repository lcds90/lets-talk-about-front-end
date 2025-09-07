<template>
  <div class="flex" :class="{ 'justify-content-end': msg.direction === 'sent' }">
    <div class="flex align-items-end message-group">
      <Avatar
        v-if="msg.direction === 'received'"
        :image="messageAvatar"
        shape="circle"
        class="p-mr-2"
      />

      <div class="message-bubble" :class="msg.direction">
        <div v-if="msg.content.type === 'image'" class="message-image-container">
          <Image :src="msg.content.payload" alt="Imagem enviada" preview />
        </div>

        <div v-if="msg.content.type === 'text'" class="message-text">
          {{ msg.content.payload }}
        </div>

        <div v-if="msg.content.buttons" class="flex flex-wrap mt-4 gap-2 justify-content-center">
          <Button
            v-for="button in msg.content.buttons"
            :key="button.payload"
            :label="button.text"
            @click="$emit('on-button-click', button.payload)"
            severity="help"
            outlined
            size="small"
            class="border-round-lg"
          />
        </div>

        <div class="message-info flex align-items-center">
          <small class="text-color-secondary">{{ msg.time }}</small>
          <i v-if="msg.direction === 'received'" class="pi pi-check ml-1 message-status"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from '../types/Message'
import { computed } from 'vue'

interface Props {
  msg: Message
}

const messageAvatar = computed(() => (props.msg.sender?.avatar ? props.msg.sender.avatar : ''))
const props = defineProps<Props>()
defineEmits(['on-button-click'])
</script>

<style>
/* Bolha de mensagem */
.message-bubble {
  padding: 0.75rem;
  border-radius: 12px;
  max-width: 50dvw;
  min-width: 30dvw;
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
</style>
