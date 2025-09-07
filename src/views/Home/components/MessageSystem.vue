<template>
  <div class="system-message">
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<style>
.system-message {
  text-align: center;
  font-size: 0.8rem;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.system-message span {
  background-color: #e9ecef;
  padding: 4px 12px;
  border-radius: 12px;
  width: max-content;
}
</style>
