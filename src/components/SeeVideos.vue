<script setup lang="ts">
import type { ISocialMedia } from '../types'
import SocialMediaCard from './SocialMediaCard.vue'
const socialMedia: {
  title: string
  socialMedia: ISocialMedia
  linkExternal: string
}[] = [
  {
    title: 'Instagram',
    socialMedia: 'instagram',
    linkExternal: 'https://instagram.com',
  },
  {
    title: 'TikTok',
    socialMedia: 'tiktok',
    linkExternal: 'https://tiktok.com',
  },
  {
    title: 'YouTube',
    socialMedia: 'youtube',
    linkExternal: 'https://youtube.com',
  },
]
</script>

<template>
  <section class="see-videos">
    <h2>🎥 Veja esse conteúdo em vídeo</h2>
    <div class="grid">
      <social-media-card
        v-for="item in socialMedia"
        :key="item.socialMedia"
        :title="item.title"
        :social-media="item.socialMedia"
        :link-external="item.linkExternal"
      />
    </div>
  </section>
</template>

<style scoped>
section.see-videos {
  background-color: rgba(50, 50, 50, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  margin-block: 1rem;
  /* position: fixed;
    padding-top: 0;
    padding-bottom: 0;
    padding-inline: 1rem;
    bottom: -8rem;
    left: 50%;
    transform: translateX(-50%); */
}

section h2 {
  margin: 0.5rem 0;
  border-top: 0;
  padding-top: 0;
  text-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  font-weight: 200;
  font-size: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  place-items: center;
}

details {
  padding: 0.5rem;
  margin-block: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
}

summary {
  cursor: pointer;
  outline: none;
}

details h2 {
  display: inline;
  margin-left: 0.5rem;
}
</style>
