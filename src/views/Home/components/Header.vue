<template>
  <Button
    icon="pi pi-arrow-left"
    class="p-button-text p-button-rounded mr-2"
    @click="$emit('return')"
  />
  <Avatar :image="avatar" size="large" shape="circle" />
  <div class="flex flex-column ml-2">
    <span class="font-bold">{{ name }}</span>
    <small class="text-color-secondary">{{ status }}</small>
  </div>
</template>

<script setup lang="ts">
interface Props {
  avatar: string
  name: string
  status: string
}

defineProps<Props>()
defineEmits(['return'])
</script>
