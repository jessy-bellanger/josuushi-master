<script setup lang="ts">
import { ref } from 'vue'
import SentenceDisplay from './SentenceDisplay.vue'
import HintPanel from './HintPanel.vue'

const userInput = ref('')
// Visual scaffold — live kana conversion will go here
const kanaPreview = ref('さんびき')
</script>

<template>
  <div class="free-input-mode">

    <SentenceDisplay
      before="猫が"
      highlight="3匹"
      after="います。"
    />

    <div class="question-label">Comment lit-on <strong>3匹</strong> ?</div>

    <div class="input-area">
      <div class="input-wrapper">
        <input
          type="text"
          class="answer-input"
          v-model="userInput"
          placeholder="Romaji ou kana…"
          autocomplete="off"
          spellcheck="false"
        />
        <div class="kana-preview">{{ kanaPreview }}</div>
      </div>
      <button class="btn-validate">Valider</button>
    </div>

    <HintPanel />

    <!-- Feedback zone (hidden by default, shown after submit) -->
    <div class="feedback feedback--correct" style="display:none">
      <span class="feedback-icon">✓</span>
      <span>Correct !</span>
    </div>
    <div class="feedback feedback--error" style="display:none">
      <span class="feedback-icon">✗</span>
      <span>La bonne réponse était <strong>さんびき</strong></span>
    </div>

  </div>
</template>

<style scoped>
.free-input-mode {
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

.input-area {
  display: flex;
  gap: 0.6rem;
  width: 100%;
  max-width: 28rem;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.answer-input {
  width: 100%;
  padding: 0.7rem 1rem;
  padding-right: 6rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: border-color .15s;
}

.answer-input:focus {
  border-color: var(--primary);
}

.kana-preview {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--primary);
  pointer-events: none;
}

.btn-validate {
  padding: 0.7rem 1.4rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background .15s;
}

.btn-validate:hover {
  background: var(--primary-dark);
}

.feedback {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 500;
}

.feedback--correct {
  background: #f0fdf4;
  color: var(--correct);
  border: 1px solid #bbf7d0;
}

.feedback--error {
  background: #fef2f2;
  color: var(--error);
  border: 1px solid #fecaca;
}

.feedback-icon { font-size: 1.1rem; }
</style>
