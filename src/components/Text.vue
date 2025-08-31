<script setup lang="ts">
interface Props {
  tag?: string
  isPrimary?: boolean
  isSecondary?: boolean
  isTitle?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'p',
  isPrimary: false,
  isSecondary: false,
  isTitle: false,
})
</script>
<template>
  <component
    :is="tag"
    :class="{
      'has-text-primary': isPrimary,
      'has-text-secondary': isSecondary,
      'has-title': isTitle,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.has-text-primary {
}

.has-text-secondary {
}

.has-title {
  font-size: 2rem;
  font-weight: lighter;
  line-height: 2;
  color: var(--text-primary-color);
  margin-right: 0.5rem;
}
</style>
