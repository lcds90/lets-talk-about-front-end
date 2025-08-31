<script setup lang="ts">
import { ISocialMedia } from '../types'

interface Props {
  title: string
  socialMedia: ISocialMedia
  linkExternal: string
}

defineProps<Props>()
defineEmits(['open'])
</script>

<template>
  <article class="card" :class="socialMedia">
    <header class="card-header">
      <font-awesome-icon :icon="['fab', socialMedia]" class="icon" aria-hidden="true" />
      <h3>{{ title }}</h3>
    </header>
    <div class="card-actions">
      <button
        class="btn"
        @click="$emit('open')"
        :title="`Assistir conteúdo no ${socialMedia}`"
        :aria-label="`Assistir conteúdo no ${socialMedia}`"
        tabindex="0"
        :data-track="`social-media-player-${socialMedia}`"
      >
        <font-awesome-icon :icon="['fas', 'play-circle']" aria-hidden="true" />
      </button>
      <a
        :href="linkExternal"
        target="_blank"
        rel="noopener noreferrer"
        class="btn"
        :title="`Abrir canal do ${socialMedia}`"
        :aria-label="`Abrir canal do ${socialMedia}`"
        tabindex="0"
        :data-track="`social-media-external-${socialMedia}`"
      >
        <font-awesome-icon
          :icon="['fas', 'user']"
          size="1x"
          :style="{ fontSize: '0.75em' }"
          aria-hidden="true"
        />
      </a>
    </div>
  </article>
</template>

<style scoped>
.card {
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 1.2rem;
  width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 8px;
}

.card-header h3 {
  margin: 0;
  font-weight: 200;
}

.icon {
  font-size: 1.5rem;
}

.card-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #333;
  border: 2px solid #ccc;
  padding: 4px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background-color: #a0a0a0;
  color: #fff;
}

.btn:focus {
  outline: 3px solid #000; /* Altere a cor conforme necessário */
  outline-offset: 2px;
}

.instagram {
  background: linear-gradient(
    135deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  color: white;
}

.tiktok {
  background: linear-gradient(135deg, #69c9d0 0%, #ee1d52 100%);
  color: white;
}

.youtube {
  background: linear-gradient(135deg, #ff0000 0%, #c4302b 100%);
  color: white;
}
</style>
