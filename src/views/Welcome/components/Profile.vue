<script setup lang="ts">
import { Card } from '../../../components'
import { Profile, useGreetings } from '../composables'
interface Props {
  profile: Profile
}

defineProps<Props>()

const { getGreeting } = useGreetings()
</script>

<template>
  <Card id="profile">
    <article class="media-container">
      <div class="media-photo">
        <img :alt="profile.alt" :src="profile.img" />
      </div>
    </article>
    <hr class="line" />
    <article class="card-text-greeting">
      <p id="greeting" class="title">
        {{ getGreeting }}
      </p>

      <p>
        Eu sou <b>{{ profile.display_name }}</b>
      </p>
    </article>
  </Card>
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
</style>
