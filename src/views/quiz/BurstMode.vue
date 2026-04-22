<script setup lang="ts">
import { ref } from 'vue'

// Visual scaffold — mock data
const timeRemaining = ref(24)
const correctCount  = ref(7)
const errorCount    = ref(2)
const userInput     = ref('')

// Current and next combos (mock)
const nextCombo    = '5本'
const currentCombo = '3匹'
</script>

<template>
  <div class="burst-mode">

    <!-- Timer bar -->
    <div class="timer-bar-wrapper">
      <div
        class="timer-bar-fill"
        :style="{ width: (timeRemaining / 30 * 100) + '%' }"
        :class="{ 'timer-bar-fill--low': timeRemaining <= 10 }"
      />
    </div>

    <!-- Score row -->
    <div class="score-row">
      <span class="score-correct">{{ correctCount }} ✓</span>
      <span class="timer-label">{{ timeRemaining }}s</span>
      <span class="score-error">{{ errorCount }} ✗</span>
    </div>

    <!-- Combo stack (Star Wars style, slides down) -->
    <div class="combo-stack">
      <div class="combo-next">{{ nextCombo }}</div>
      <div class="combo-current">{{ currentCombo }}</div>
    </div>

    <!-- Input area -->
    <div class="input-area">
      <div class="input-wrapper">
        <input
          type="text"
          class="burst-input"
          v-model="userInput"
          placeholder="Romaji ou kana…"
          autocomplete="off"
          spellcheck="false"
        />
        <div class="kana-preview" v-if="userInput">さんびき</div>
      </div>
    </div>

    <p class="skip-hint">↵ Valider &nbsp;·&nbsp; Échap / Tab = passer</p>

  </div>
</template>

<style scoped>
.burst-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-top: 0.5rem;
}

/* Timer bar */
.timer-bar-wrapper {
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.timer-bar-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 1s linear, background .3s;
}

.timer-bar-fill--low { background: var(--error); }

/* Score row */
.score-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 28rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.score-correct { color: var(--correct); }
.score-error   { color: var(--error); }
.timer-label   { color: var(--text-muted); font-variant-numeric: tabular-nums; }

/* Combo stack */
.combo-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 0 0.5rem;
}

.combo-next {
  font-size: 1.4rem;
  color: var(--text-muted);
  opacity: 0.55;
  letter-spacing: 0.05em;
}

.combo-current {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
  letter-spacing: 0.02em;
}

/* Input */
.input-area {
  width: 100%;
  max-width: 28rem;
}

.input-wrapper { position: relative; }

.burst-input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 7rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  font-size: 1.05rem;
  font-family: inherit;
  outline: none;
  text-align: center;
  transition: border-color .15s;
}

.burst-input:focus { border-color: var(--primary); }

.kana-preview {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--primary);
  pointer-events: none;
}

.skip-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
