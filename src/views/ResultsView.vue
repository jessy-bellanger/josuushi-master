<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock session results
const results = [
  { sentence: '猫が3匹います。',   counterDisplay: '3匹',  correct: true,  hintUsed: false, score: 1    },
  { sentence: '本が1冊あります。',  counterDisplay: '1冊',  correct: true,  hintUsed: true,  score: 0.5  },
  { sentence: '魚が6匹います。',   counterDisplay: '6匹',  correct: false, hintUsed: false, score: 0    },
  { sentence: '電車が2台います。',  counterDisplay: '2台',  correct: true,  hintUsed: false, score: 1    },
  { sentence: '紙が10枚あります。', counterDisplay: '10枚', correct: true,  hintUsed: false, score: 1    },
]

const totalScore   = results.reduce((s, r) => s + r.score, 0)
const maxScore     = results.length
const correctCount = results.filter(r => r.correct).length
const percent      = Math.round((totalScore / maxScore) * 100)
</script>

<template>
  <div class="results-view">

    <div class="results-card">

      <!-- Score hero -->
      <div class="score-hero">
        <div class="score-circle" :class="scoreClass">
          <span class="score-percent">{{ percent }}%</span>
          <span class="score-label">Score</span>
        </div>
        <div class="score-details">
          <p class="score-points"><strong>{{ totalScore }}</strong> / {{ maxScore }} pts</p>
          <p class="score-correct">{{ correctCount }} / {{ results.length }} bonnes réponses</p>
        </div>
      </div>

      <hr class="divider" />

      <!-- Detail list -->
      <ul class="result-list">
        <li
          v-for="(r, i) in results"
          :key="i"
          class="result-item"
          :class="r.correct ? 'result-item--correct' : 'result-item--wrong'"
        >
          <span class="result-icon">{{ r.correct ? '✓' : '✗' }}</span>
          <span class="result-sentence">
            {{ r.sentence }}
            <span v-if="r.hintUsed" class="hint-badge">hint</span>
          </span>
          <span class="result-score">{{ r.score }} pt</span>
        </li>
      </ul>

    </div>

    <div class="actions">
      <button class="btn-secondary" @click="router.push('/')">Changer les réglages</button>
      <button class="btn-primary" @click="router.push('/quiz')">Rejouer →</button>
    </div>

  </div>
</template>

<style scoped>
.results-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.results-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  box-shadow: var(--shadow);
}

/* Score hero */
.score-hero {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.score-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: 5px solid var(--correct);
  flex-shrink: 0;
}

.score-percent {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  color: var(--correct);
}

.score-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: .06em;
}

.score-details { display: flex; flex-direction: column; gap: 0.35rem; }

.score-points {
  font-size: 1.1rem;
}

.score-points strong { color: var(--primary); }

.score-correct {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.25rem 0;
}

/* Result list */
.result-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.result-item--correct { background: #f0fdf4; }
.result-item--wrong   { background: #fef2f2; }

.result-icon {
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.result-item--correct .result-icon { color: var(--correct); }
.result-item--wrong   .result-icon { color: var(--error);   }

.result-sentence {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hint-badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 0.25rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .04em;
}

.result-score {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.82rem;
  white-space: nowrap;
}

/* Actions */
.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-primary, .btn-secondary {
  padding: 0.7rem 1.6rem;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  transition: all .15s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover { background: var(--primary-dark); }

.btn-secondary {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}
</style>
