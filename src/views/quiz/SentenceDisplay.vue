<script setup lang="ts">
// Visual scaffold — props are placeholders
defineProps<{
  before?: string
  highlight?: string
  after?: string
}>()
</script>

<template>
  <div class="sentence-display">
    <p class="sentence">
      <span class="ctx">{{ before }}</span>
      <span class="highlight">{{ highlight }}</span>
      <span class="ctx">{{ after }}</span>
    </p>
  </div>
</template>

<style scoped>
.sentence-display {
  text-align: center;
  padding: 1.5rem 1rem 1rem;
}

.sentence {
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--text);
}

.highlight {
  display: inline-block;
  color: var(--primary);
  font-weight: 700;
  border-bottom: 3px solid var(--primary);
  padding-bottom: 0.05em;
  margin: 0 0.05em;
}
</style>
