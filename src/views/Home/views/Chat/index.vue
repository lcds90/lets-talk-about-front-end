<template>
  <div class="chat-container flex flex-column">
    <Toolbar class="chat-header flex-shrink-1 p-2">
      <template #start>
        <Button icon="pi pi-arrow-left" class="p-button-text p-button-rounded mr-2" />
        <Avatar :image="contact.avatar" size="large" shape="circle" />
        <div class="flex flex-column ml-2">
          <span class="font-bold">{{ contact.name }}</span>
          <small class="text-color-secondary">{{ contact.status }}</small>
        </div>
      </template>

      <template #end>
        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded" />
      </template>
    </Toolbar>

    <div class="messages-area overflow-y-auto p-3 flex-grow-1 pb-6" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" class="mb-3">
        <div v-if="msg.type === 'date'" class="date-separator">
          <span>{{ msg.text }}</span>
        </div>

        <div v-if="msg.type === 'system'" class="system-message">
          <span>{{ msg.text }}</span>
        </div>

        <div
          v-if="msg.type === 'message'"
          class="flex"
          :class="{ 'justify-content-end': msg.sender === currentUser }"
        >
          <div class="flex p-ai-end message-group">
            <Avatar
              v-if="msg.sender !== currentUser"
              :image="contact.avatar"
              shape="circle"
              class="p-mr-2"
            />

            <div class="message-bubble" :class="msg.sender === currentUser ? 'sent' : 'received'">
              <div v-if="msg.image" class="message-image-container">
                <Image :src="msg.image" alt="Imagem enviada" preview />
              </div>

              <div v-if="msg.text" class="message-text">
                {{ msg.text }}
              </div>

              <div class="message-info flex align-items-center">
                <small class="text-color-secondary">{{ msg.time }}</small>
                <i v-if="msg.sender === currentUser" class="pi pi-check ml-1 message-status"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-footer p-2 flex align-items-center fixed w-full bottom-0">
      <Button icon="pi pi-plus" class="p-button-text p-button-rounded" />
      <InputText
        type="text"
        placeholder="Enter message"
        class="flex-grow-1 mx-2"
        v-model="newMessage"
        @keyup.enter="sendMessage"
      />
      <Button
        icon="pi pi-send"
        class="p-button-rounded"
        @click="sendMessage"
        :disabled="!newMessage.trim()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Importe os componentes do PrimeVue que você está usando
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Image from 'primevue/image'

// --- Dados de Exemplo (Mock Data) ---

// Informações do contato atual
const contact = ref({
  name: 'Katherine',
  avatar: 'https://i.pravatar.cc/150?u=katherine',
  status: 'Last seen at 5 minutes ago',
})

// ID do usuário atual (para diferenciar mensagens enviadas e recebidas)
const currentUser = 'me'

// Mensagens da conversa
const messages = ref([
  {
    id: 1,
    type: 'date',
    text: new Date().toLocaleString(),
  },
  {
    id: 2,
    type: 'system',
    text: 'Um explorador da tecnologia se juntou ao chat ✨',
  },
  {
    id: 3,
    type: 'message',
    sender: 'Leonardo',
    text: 'Olá, seja bem vindo ao meu portoflio!',
    time: '7:30 PM',
  },
  {
    id: 4,
    type: 'message',
    sender: currentUser,
    text: 'Let me see.',
    time: '7:30 PM',
  },
  {
    id: 5,
    type: 'message',
    sender: 'Katherine',
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=800',
    time: '7:30 PM',
  },
  {
    id: 6,
    type: 'message',
    sender: currentUser,
    text: "I'll take him to the vet.",
    time: '7:30 PM',
  },
])

// --- Lógica do Componente ---

const newMessage = ref('')
const messagesContainer = ref(null)

// Função para enviar uma nova mensagem
const sendMessage = () => {
  if (newMessage.value.trim() === '') return

  messages.value.push({
    id: Date.now(),
    type: 'message',
    sender: currentUser,
    text: newMessage.value,
    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  })

  newMessage.value = ''
  scrollToBottom()
}

// Função para rolar para a última mensagem
const scrollToBottom = async () => {
  await nextTick() // Espera o DOM ser atualizado com a nova mensagem
  const container = messagesContainer.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

// Rola para o final quando o componente é montado
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
/* Estilização do container principal */
.chat-container {
  /* padding: 16px; */
  /* margin: 16px; */
  /* max-width: 450px; Largura similar a um celular */
  margin: 0 auto; /* Centraliza na tela */
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: auto;
  background-color: #ffffff;
}

/* Estilização do cabeçalho */
.chat-header {
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0; /* Impede que o header encolha */
}

/* Área de mensagens */
.messages-area {
  background-color: #f7f7f7;
}

/* Bolha de mensagem */
.message-bubble {
  padding: 0.75rem;
  border-radius: 12px;
  color: #333;
}

/* Bolha de mensagem enviada (direita) */
.message-bubble.sent {
  background-color: #e0d6ff; /* Roxo claro, como na imagem */
  color: #3b0764;
  border-bottom-right-radius: 4px; /* Para dar o efeito de "cauda" */
}

/* Bolha de mensagem recebida (esquerda) */
.message-bubble.received {
  background-color: #ffffff;
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

/* Estilos para divisores de data e mensagens de sistema */
.date-separator,
.system-message {
  text-align: center;
  font-size: 0.8rem;
  color: #6c757d;
}

.date-separator span,
.system-message span {
  background-color: #e9ecef;
  padding: 4px 12px;
  border-radius: 12px;
}

/* Imagens dentro das mensagens */
.message-image-container {
  margin-bottom: 5px;
}
:deep(.p-image-preview) {
  border-radius: 8px;
  max-width: 100%;
}
:deep(.p-image-preview img) {
  border-radius: 8px;
}

/* Rodapé */
.input-footer {
  border-top: 1px solid #dee2e6;
  background-color: #ffffff;
  position: fixed;
}
</style>
