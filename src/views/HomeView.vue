<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RangeSlider from '@/components/ui/RangeSlider.vue'

const router = useRouter()

const counters = [
  { id: 'tsu', writing: 'つ', label: 'Objets généraux' },
  { id: 'ko', writing: '個', label: 'Petits objets' },
  { id: 'hiki', writing: '匹', label: 'Petits animaux' },
  { id: 'hon', writing: '本', label: 'Objets longs' },
  { id: 'mai', writing: '枚', label: 'Objets plats' },
  { id: 'satsu', writing: '冊', label: 'Livres' },
  { id: 'dai', writing: '台', label: 'Machines' },
  { id: 'nin', writing: '人', label: 'Personnes' },
]

const modes = [
  {
    id: 'free-input',
    label: 'Saisie libre',
    description: 'Tapez la lecture du nombre + compteur en kana',
  },
  {
    id: 'multiple-choice',
    label: 'QCM de lecture',
    description: 'Choisissez parmi 4 propositions de lecture',
  },
  {
    id: 'counter-choice',
    label: 'QCM sémantique',
    description: 'Trouvez le bon compteur (pas le droit à つ !)',
  },
  { id: 'burst', label: '⚡ Rafale  — 30s', description: 'Le plus de bonnes réponses possible !' },
]

const selectedCounters = ref<string[]>(['hiki', 'hon'])
const selectedMode = ref('free-input')
const rangeMin = ref(1)
const rangeMax = ref(10)
const includeNan = ref(false)

function toggleCounter(id: string) {
  const i = selectedCounters.value.indexOf(id)
  if (i >= 0) selectedCounters.value.splice(i, 1)
  else selectedCounters.value.push(id)
}
</script>

<template>
  <div class="home">
    <section class="section">
      <h2 class="section-title">Compteurs</h2>
      <div class="counter-grid">
        <button
          v-for="c in counters"
          :key="c.id"
          class="counter-card"
          :class="{ selected: selectedCounters.includes(c.id) }"
          @click="toggleCounter(c.id)"
        >
          <span class="counter-writing">{{ c.writing }}</span>
          <span class="counter-label">{{ c.label }}</span>
        </button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Mode de jeu</h2>
      <div class="mode-grid">
        <button
          v-for="m in modes"
          :key="m.id"
          class="mode-card"
          :class="{ selected: selectedMode === m.id }"
          @click="selectedMode = m.id"
        >
          <span class="mode-label">{{ m.label }}</span>
          <span class="mode-desc">{{ m.description }}</span>
        </button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Plage de nombres</h2>
      <div class="range-row">
        <RangeSlider v-model:model-min="rangeMin" v-model:model-max="rangeMax" />
        <label class="nan-toggle">
          <input type="checkbox" v-model="includeNan" />
          Inclure 何 (combien ?)
        </label>
      </div>
    </section>

    <div class="start-row">
      <button
        class="btn-start"
        :disabled="selectedCounters.length === 0"
        @click="router.push('/quiz')"
      >
        Commencer →
      </button>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

/* --- Compteurs --- */
.counter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

.counter-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.9rem 0.5rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  transition: all 0.15s;
}

.counter-card:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  box-shadow: var(--shadow);
}

.counter-card.selected {
  border-color: var(--primary);
  background: var(--primary);
}

.counter-card.selected .counter-writing {
  color: white;
}

.counter-card.selected .counter-label {
  color: rgba(255, 255, 255, 0.75);
}

.counter-writing {
  font-size: 2rem;
  line-height: 1;
  color: var(--primary);
}

.counter-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-align: center;
}

/* --- Modes --- */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

.mode-card {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.9rem 1rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  text-align: left;
  transition: all 0.15s;
}

.mode-card:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  box-shadow: var(--shadow);
}

.mode-card.selected {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
}

.mode-card.selected .mode-desc {
  color: rgba(255, 255, 255, 0.7);
}

.mode-label {
  font-weight: 600;
  font-size: 0.95rem;
}
.mode-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* --- Plage --- */
.range-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.range-row label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.range-row input[type='number'] {
  width: 3.5rem;
  padding: 0.3rem 0.4rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  font-size: 0.9rem;
  text-align: center;
}

.nan-toggle {
  cursor: pointer;
  user-select: none;
}

.nan-toggle input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid var(--border);
  border-radius: 0.3rem;
  background: var(--bg);
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  flex-shrink: 0;
}

.nan-toggle input[type='checkbox']:hover {
  border-color: var(--primary);
}

.nan-toggle input[type='checkbox']:checked {
  background: var(--primary);
  border-color: var(--primary);
}

.nan-toggle input[type='checkbox']:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -62%) rotate(45deg);
  width: 0.28rem;
  height: 0.52rem;
  border: 2px solid white;
  border-top: none;
  border-left: none;
}

/* --- Start --- */
.start-row {
  display: flex;
  justify-content: flex-end;
}

.btn-start {
  padding: 0.75rem 2.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.15s;
}

.btn-start:hover:not(:disabled) {
  background: var(--primary-dark);
}
.btn-start:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
