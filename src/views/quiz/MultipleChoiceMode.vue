<script setup lang="ts">
import { ref } from 'vue'
import SentenceDisplay from './SentenceDisplay.vue'
import HintPanel from './HintPanel.vue'

// Visual scaffold — mock options
const options = ['さんびき', 'さんぴき', 'さんぼん', 'みっつ']
const selected = ref<string | null>(null)
const correctAnswer = 'さんびき'
</script>

<template>
  <div class="mc-mode">

    <SentenceDisplay
      before="猫が"
      highlight="3匹"
      after="います。"
    />

    <div class="question-label">Comment lit-on <strong>3匹</strong> ?</div>

    <div class="options-grid">
      <button
        v-for="opt in options"
        :key="opt"
        class="option-btn"
        :class="{
          'option-btn--selected': selected === opt,
          'option-btn--correct': selected && opt === correctAnswer,
          'option-btn--wrong': selected === opt && opt !== correctAnswer,
        }"
        @click="selected = opt"
      >
        {{ opt }}
      </button>
    </div>

    <HintPanel />

  </div>
</template>

<style scoped>
.mc-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
}

.question-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  width: 100%;
  max-width: 28rem;
}

.option-btn {
  padding: 0.85rem 1rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  font-size: 1.05rem;
  font-family: inherit;
  text-align: center;
  transition: all .15s;
}

.option-btn:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option-btn--selected {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
}

.option-btn--correct {
  border-color: var(--correct);
  background: #f0fdf4;
  color: #166534;
  font-weight: 600;
}

.option-btn--wrong {
  border-color: var(--error);
  background: #fef2f2;
  color: #991b1b;
}
</style>
