<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

import { Header, MessageSystem, MessageUser } from '../components'

import { ConversationPayload, useConversations, useGravatarProfile } from '../composables'
import { storeToRefs } from 'pinia'
import MessageTyping from '../components/MessageTyping.vue'
import SocialLinks from '../components/SocialLinks.vue'

const conversationsStore = useConversations()
const { messages, newMessage, stillTyping } = storeToRefs(conversationsStore)
const { profile } = storeToRefs(useGravatarProfile())

// ID do usuário atual (para diferenciar mensagens enviadas e recebidas)
const emit = defineEmits(['toggle-chat'])
const endChat = () => {
  emit('toggle-chat')
}

const messagesContainer = ref<HTMLElement | null>(null)

// Função para rolar para a última mensagem
const scrollToBottom = async (timeout = 1) => {
  await nextTick() // Espera o DOM ser atualizado com a nova mensagem
  const container = messagesContainer.value
  if (container) {
    // const el = container.querySelector('.typing')
    const el = [...container.querySelectorAll('.message-bubble')].pop()
    console.dir(el)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }, timeout)
    }
  }
}

onMounted(() => {
  conversationsStore.updateDate()
  setTimeout(() => {
    scrollToBottom()
  }, 1000)
})

const handlebutton = (payload: ConversationPayload) => {
  conversationsStore.handleButtonClick(payload)
}

watch(
  messages,
  () => {
    scrollToBottom()
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="chat-container">
    <Toolbar class="chat-header flex-shrink-1 p-2">
      <template #start>
        <Header
          @return="endChat"
          :avatar="profile.img"
          :name="profile.display_name"
          status="🤖 Assistente online"
        />
      </template>

      <template #end>
        <SocialLinks />
      </template>
    </Toolbar>

    <div class="messages-area overflow-y-auto p-3 flex-grow-1 pb-6" ref="messagesContainer">
      <div
        v-for="(msg, index) in messages"
        :key="msg.id"
        :class="stillTyping || index !== messages.length - 1 ? 'mb-3' : 'mb-5'"
      >
        <MessageSystem
          v-if="['date', 'system'].includes(msg.type)"
          :type="msg.type"
          :text="msg.content.payload"
        />
        <MessageUser v-else :msg="msg" @on-button-click="handlebutton" />
      </div>
      <MessageTyping v-if="stillTyping" class="mb-5" :typing="stillTyping" />
    </div>

    <div class="input-footer p-2 flex align-items-center fixed w-full bottom-0">
      <Button icon="pi pi-plus" class="p-button-text p-button-rounded" />
      <InputText
        type="text"
        placeholder="Enter message"
        class="flex-grow-1 mx-2"
        v-model="newMessage"
        @keyup.enter="conversationsStore.sendMessage"
      />
      <Button
        icon="pi pi-send"
        class="p-button-rounded"
        @click="conversationsStore.sendMessage"
        :disabled="!newMessage.trim()"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  margin: 0 auto;
  overflow: auto;
  background-color: #ffffff;
  height: 100vh;
  display: grid;
  grid-template-rows: 10dvh 1fr max-content;
}

.chat-header {
  border-bottom: 1px solid #dee2e6;
  border-radius: 0;
}

.messages-area {
  background-color: #2a2a2e;
}

.input-footer {
  border-top: 1px solid #dee2e63b;
  position: fixed;
  backdrop-filter: blur(10px);
}

.messages-area::-webkit-scrollbar {
  display: block;
  width: 4px;
}
.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background-color: #5d5d5d;
  /* border-right: none; */
  /* border-left: none; */
}

.messages-area::-webkit-scrollbar-track-piece:start {
  background: transparent;
}

.messages-area::-webkit-scrollbar-track-piece:end {
  background: transparent;
  margin-bottom: 8dvh;
}
</style>
