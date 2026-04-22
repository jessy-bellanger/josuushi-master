<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button class="audio-btn" :disabled="disabled" title="Écouter la prononciation">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  </button>
</template>

<style scoped>
.audio-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg);
  color: var(--text-muted);
  transition: all .15s;
  flex-shrink: 0;
}

.audio-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}

.audio-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
