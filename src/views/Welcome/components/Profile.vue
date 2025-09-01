<script setup lang="ts">
import Panel from 'primevue/panel'
import { Profile } from '../composables'
import Avatar from 'primevue/avatar'
import Techs from './Techs.vue'
interface Props {
  profile: Profile
}

defineProps<Props>()
</script>

<template>
  <section>
    <Panel toggleable>
      <template #header>
        <div class="header">
          <Avatar :image="profile.img" :alt="profile.alt" shape="circle" />
          <span class="font-bold">{{ profile.display_name }}</span>
        </div>
      </template>
      <article>
        <h3>💡 𝑸𝒖𝒆𝒎 𝒔𝒐𝒖 𝒆𝒖</h3>
        <p>
          Paulista de 28 anos, e uma pessoa apaixonada por tecnologia e construir experiências
          melhores e únicas mediante telas digitais, minha trajetória total já contabiliza 5 anos
          atuando com desenvolvimento web!
        </p>
      </article>
      <Techs />
    </Panel>
  </section>
</template>

<style scoped>
.line {
  color: #ccc;
  background-color: #ccc;
  height: 1px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  border: none;
}

.header {
  display: flex;
  gap: 8px;
  align-items: center;
}

.media-container {
  display: flex;
  place-items: center;
  justify-content: center;
  align-items: center;
}

.media-photo {
  width: 100px;
  z-index: 10;
  border: 3px solid #ccc;
  border-radius: 2rem;
}

.media-photo img {
  width: 100%;
  border-radius: 2rem;
}

section :deep(h3) {
  margin-top: 8px;
}
</style>
