<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AudioButton from '@/components/ui/AudioButton.vue'
import FreeInputMode     from './quiz/FreeInputMode.vue'
import MultipleChoiceMode from './quiz/MultipleChoiceMode.vue'
import CounterChoiceMode  from './quiz/CounterChoiceMode.vue'
import BurstMode          from './quiz/BurstMode.vue'

const router = useRouter()

// Visual scaffold — switch between modes for preview
type Mode = 'free-input' | 'multiple-choice' | 'counter-choice' | 'burst'
const activeMode = ref<Mode>('free-input')

const modes: { id: Mode; label: string }[] = [
  { id: 'free-input',      label: 'Saisie libre'     },
  { id: 'multiple-choice', label: 'QCM'              },
  { id: 'counter-choice',  label: 'Choix du compteur'},
  { id: 'burst',           label: '⚡ Rafale'         },
]

// Mock progress
const current  = 3
const total    = 10
const progress = (current / total) * 100
</script>

<template>
  <div class="quiz-view">

    <!-- Top bar (hidden in real burst mode) -->
    <header class="quiz-header" v-if="activeMode !== 'burst'">
      <button class="btn-back" @click="router.push('/')">← Quitter</button>

      <div class="progress-area">
        <span class="progress-label">{{ current }}&thinsp;/&thinsp;{{ total }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }" />
        </div>
      </div>

      <AudioButton />
    </header>

    <!-- Mode preview switcher (dev convenience — will be removed) -->
    <div class="mode-switcher">
      <button
        v-for="m in modes"
        :key="m.id"
        class="mode-pill"
        :class="{ active: activeMode === m.id }"
        @click="activeMode = m.id"
      >
        {{ m.label }}
      </button>
    </div>

    <!-- Active mode component -->
    <div class="mode-container">
      <FreeInputMode      v-if="activeMode === 'free-input'"      />
      <MultipleChoiceMode v-else-if="activeMode === 'multiple-choice'" />
      <CounterChoiceMode  v-else-if="activeMode === 'counter-choice'"  />
      <BurstMode          v-else-if="activeMode === 'burst'"           />
    </div>

    <!-- Bottom nav (non-burst) -->
    <div class="quiz-footer" v-if="activeMode !== 'burst'">
      <button class="btn-next" @click="router.push('/results')">Question suivante →</button>
    </div>

  </div>
</template>

<style scoped>
.quiz-view {
  max-width: 680px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 100%;
}

/* Header */
.quiz-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-back {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 0.25rem 0;
  white-space: nowrap;
  transition: color .15s;
}

.btn-back:hover { color: var(--text); }

.progress-area {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.progress-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width .3s ease;
}

/* Mode switcher (preview only) */
.mode-switcher {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.mode-pill {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 2rem;
  background: transparent;
  font-size: 0.78rem;
  color: var(--text-muted);
  transition: all .15s;
}

.mode-pill:hover { border-color: var(--primary); color: var(--primary); }
.mode-pill.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* Mode container */
.mode-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Footer */
.quiz-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-next {
  padding: 0.65rem 1.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 600;
  transition: background .15s;
}

.btn-next:hover { background: var(--primary-dark); }
</style>
