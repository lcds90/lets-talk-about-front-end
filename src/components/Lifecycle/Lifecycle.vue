<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  nextTick,
  onErrorCaptured,
} from 'vue'
import gsap from 'gsap'

// Interface para tipagem do Log
interface LifecycleLog {
  id: number
  hook: string
  timestamp: string
  color: string
}

const logs = ref<LifecycleLog[]>([])
const counter = ref(0) // Estado para forçar updates
let logId = 0

// Função auxiliar para adicionar logs e rolar para baixo
const addLog = (hookName: string, colorClass: string) => {
  const now = new Date()
  const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`

  logs.value.push({
    id: logId++,
    hook: hookName,
    timestamp: timeString,
    color: colorClass,
  })

  console.log(`Lifecycle: ${hookName} at ${timeString}`)
  // Auto-scroll para o último log
  nextTick(() => {
    const container = document.querySelector('.toast-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

// --- REGISTRO DOS HOOKS DE LIFECYCLE ---

// 1. Fase de Montagem
onBeforeMount(() => addLog('onBeforeMount', 'bg-blue-500'))
onMounted(() => addLog('onMounted', 'bg-green-500'))

// 2. Fase de Atualização (Disparada pelo botão contador)
onBeforeUpdate(() => addLog('onBeforeUpdate', 'bg-yellow-500'))
onUpdated(() => addLog('onUpdated', 'bg-orange-500'))

// 3. Fase de Desmontagem
onBeforeUnmount(() => {
  // Nota: Como o componente será destruído, este log aparecerá apenas brevemente ou no console
  console.log('Lifecycle: onBeforeUnmount')
  addLog('onBeforeUnmount', 'bg-red-500')
})
onUnmounted(() => {
  console.log('Lifecycle: onUnmounted - Componente destruído do DOM')
})

// --- ANIMAÇÃO COM GSAP ---

// Chamado quando um elemento entra no TransitionGroup
const onEnter = (el: Element, done: () => void) => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
      onComplete: done,
    }
  )
}

// Todos os erros são capturados, porém ainda são enviadas para o app.config.errorHandler se definida.
onErrorCaptured((err, instance, info) => {
  addLog(`onErrorCaptured: ${info}`, 'bg-red-500')
  console.error('Erro capturado no componente:', err)
  return false // Impede a propagação do erro
})

const throwError = () => {
  addLog('Gerando erro propositalmente...', 'bg-red-500')
  throw new Error('Erro proposital para teste do onErrorCaptured')
}
</script>

<template>
  <div class="monitor-card">
    <div class="header">
      <h3>🔍 Monitor de Lifecycle</h3>
      <div class="controls">
        <button @click="counter++" class="btn-update">Atualizar Estado ({{ counter }})</button>
        <button @click="throwError" class="btn-update">Gerar erro</button>
      </div>
    </div>

    <div class="toast-container">
      <TransitionGroup tag="ul" :css="false" @enter="onEnter">
        <li v-for="log in logs" :key="log.id" class="toast-item" :class="log.color">
          <span class="hook-name">{{ log.hook }}</span>
          <span class="timestamp">{{ log.timestamp }}</span>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.monitor-card {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  width: 350px;
  color: white;
  font-family: sans-serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.header {
  margin-bottom: 15px;
  text-align: center;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-update {
  background: #444;
  color: #fff;
  border: 1px solid #666;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.btn-update:hover {
  background: #555;
}

.toast-container {
  height: 300px;
  overflow-y: auto;
  background: #121212;
  border-radius: 8px;
  padding: 10px;
  position: relative;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toast-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.timestamp {
  font-weight: normal;
  opacity: 0.8;
  font-size: 0.75rem;
}

/* Cores utilitárias (simulando Tailwind) */
.bg-green-500 {
  background: #10b981;
  color: white;
}
.bg-blue-500 {
  background: #3b82f6;
  color: white;
}
.bg-yellow-500 {
  background: #f59e0b;
  color: black;
}
.bg-orange-500 {
  background: #f97316;
  color: white;
}
.bg-red-500 {
  background: #ef4444;
  color: white;
}
</style>
