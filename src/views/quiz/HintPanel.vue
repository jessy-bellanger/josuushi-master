<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="hint-panel">
    <button class="hint-toggle" @click="open = !open">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      {{ open ? 'Masquer l\'indice' : 'Voir un indice' }}
    </button>

    <div v-if="open" class="hint-body">
      <p class="hint-text">
        <!-- Placeholder hint -->
        La lecture du compteur seul est <strong>ひき</strong>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.hint-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hint-toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 2rem;
  background: transparent;
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: all .15s;
}

.hint-toggle:hover {
  border-color: var(--soft);
  color: var(--soft);
}

.hint-body {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
  max-width: 28rem;
  width: 100%;
}

.hint-text {
  font-size: 0.88rem;
  color: #92400e;
  text-align: center;
}
</style>
