<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const currentURL = ref('')
const urlApiResult = computed(() =>
  URL.canParse(currentURL.value) ? new URL(currentURL.value) : null
)
const logToConsole = () => console.log(urlApiResult.value)

onMounted(() => {
  currentURL.value = window?.location.href || ''
})
</script>
<template>
  <section class="container">
    <div class="inputs">
      <button
        @click.prevent="logToConsole"
        title="Insira a URL e clique aqui para visualizar todo o objeto no console"
        class="button"
      >
        <font-awesome-icon
          :icon="['fas', 'terminal']"
          size="1x"
          :style="{ fontSize: '0.75em' }"
          aria-hidden="true"
        />
        Ver resultado no console
      </button>
      <FloatLabel>
        <InputText :title="currentURL" id="URL" v-model="currentURL" />
        <label for="URL">URL</label>
      </FloatLabel>
    </div>

    <div class="results">
      <template v-if="urlApiResult">
        <div class="result">
          <span> Host </span>
          <span>
            {{ urlApiResult.host }}
          </span>
        </div>
        <div class="result">
          <span> Origin </span>
          <span>
            {{ urlApiResult.origin }}
          </span>
        </div>
        <div class="result">
          <span> Protocol </span>
          <span>
            {{ urlApiResult.protocol }}
          </span>
        </div>
      </template>
      <div class="invalid-url" v-else>
        Essa URL está invalida.<br />Não sendo possível ser interpretada como uma URL
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(50, 50, 50, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.inputs input {
  width: 100%;
}

.results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-items: start;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.result span:first-child {
  font-weight: 200;
  color: rgb(255 255 255 / 0.75);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
  background-color: rgb(110, 110, 255, 0.25);
}

.result span:last-child {
  font-weight: 600;
}

#url {
  background-color: rgb(255 255 255 / 0.25);
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: 0.25rem;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 0.75rem;
}

fieldset {
  padding: 8px;
  border-width: 0;
}

.button {
  background-color: rgb(110, 110, 255);
  color: #fff;
  border: 1px solid rgb(110, 110, 255);
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 200;
  cursor: pointer;
}

.invalid-url {
  grid-column: 1 / -1;
}
</style>
