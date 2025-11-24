<script setup lang="ts">
import { ref } from 'vue'
import LifecycleMonitor from './Lifecycle.vue'

const isComponentVisible = ref(false)

const toggleComponent = () => {
  isComponentVisible.value = !isComponentVisible.value
}
</script>

<template>
  <div class="app-container">
    <h1>Demo de Ciclo de Vida Vue + GSAP</h1>
    <p class="placeholder-text">Abra o dev tools para acompanhar no console.</p>
    <button
      @click="toggleComponent"
      class="toggle-btn"
      :class="isComponentVisible ? 'btn-danger' : 'btn-success'"
    >
      {{ isComponentVisible ? 'Desmontar (v-if=false)' : 'Montar (v-if=true)' }}
    </button>

    <div class="component-wrapper">
      <Transition name="fade">
        <LifecycleMonitor v-if="isComponentVisible" />
      </Transition>
    </div>
  </div>
</template>

<style>
/* Estilos globais básicos para o layout */
body {
  background-color: #222;
  color: #eee;
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.app-container {
  text-align: center;
  padding-top: 50px;
}

.component-wrapper {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  min-height: 400px; /* Reserva espaço */
}

.toggle-btn {
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.1s;
}

.toggle-btn:active {
  transform: scale(0.98);
}

.btn-success {
  background-color: #10b981;
  color: white;
}
.btn-danger {
  background-color: #ef4444;
  color: white;
}

.placeholder-text {
  color: #666;
  font-style: italic;
  margin-top: 100px;
}

/* Transição suave para o container inteiro */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
