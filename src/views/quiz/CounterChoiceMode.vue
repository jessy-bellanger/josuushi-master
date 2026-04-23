<script setup lang="ts">
import { ref } from 'vue'
import HintPanel from './HintPanel.vue'

// Visual scaffold — mock data
const counterOptions = [
  { id: 'hiki', writing: '匹', label: 'Petits animaux' },
  { id: 'hon',  writing: '本', label: 'Objets longs'   },
  { id: 'mai',  writing: '枚', label: 'Objets plats'   },
  { id: 'tsu',  writing: 'つ', label: 'Objets généraux'},
]
const selected = ref<string | null>(null)
const correctId = 'hiki'
</script>

<template>
  <div class="counter-choice-mode">

    <!-- Sentence with blank instead of the counter -->
    <div class="sentence-area">
      <p class="sentence">猫が<span class="number">3</span><span class="blank">___</span>います。</p>
    </div>

    <div class="question-label">Quel compteur complète cette phrase ?</div>

    <div class="options-grid">
      <button
        v-for="opt in counterOptions"
        :key="opt.id"
        class="counter-btn"
        :class="{
          'counter-btn--selected': selected === opt.id,
          'counter-btn--correct': selected && opt.id === correctId,
          'counter-btn--wrong': selected === opt.id && opt.id !== correctId,
        }"
        @click="selected = opt.id"
      >
        <span class="counter-writing">{{ opt.writing }}</span>
        <span class="counter-role">{{ opt.label }}</span>
      </button>
    </div>

    <HintPanel />

  </div>
</template>

<style scoped>
.counter-choice-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
}

.sentence-area {
  padding: 1.5rem 1rem 0.5rem;
}

.sentence {
  font-size: 1.6rem;
  text-align: center;
}

.number {
  color: var(--primary);
  font-weight: 700;
}

.blank {
  color: var(--text-muted);
  letter-spacing: 0.1em;
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

.counter-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.9rem 0.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  transition: all .15s;
}

.counter-btn:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.counter-btn--selected {
  border-color: var(--primary);
  background: var(--primary);
}

.counter-btn--selected .counter-writing {
  color: white;
}

.counter-btn--selected .counter-role {
  color: rgba(255, 255, 255, 0.75);
}

.counter-btn--correct {
  border-color: var(--correct);
  background: #f0fdf4;
}

.counter-btn--wrong {
  border-color: var(--error);
  background: #fef2f2;
}

.counter-writing {
  font-size: 1.8rem;
  color: var(--primary);
  line-height: 1;
}

.counter-btn--correct .counter-writing { color: var(--correct); }
.counter-btn--wrong  .counter-writing { color: var(--error);   }

.counter-role {
  font-size: 0.68rem;
  color: var(--text-muted);
}
</style>
