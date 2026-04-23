<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RangeSlider from '@/components/ui/RangeSlider.vue'
import counters from '@/data/counters'
import modes from '@/data/modes.ts'
import type { Counter } from '@/types/Counter.ts'

const router = useRouter()

const counterIds = Object.keys(counters)
const selectedCounters = ref(['hiki', 'hon'])
const allSelected = computed(() => selectedCounters.value.length === counterIds.length)

function toggleAll() {
  selectedCounters.value = allSelected.value ? [] : [...counterIds]
}
const selectedMode = ref('free-input')
const rangeMin = ref(1)
const rangeMax = ref(10)
const includeNan = ref(false)

function getCounterWriting(counter: Counter) {
  if (counter.writing !== counter.defaultReading) {
    return `${counter.writing} · ${counter.defaultReading}`
  }

  return counter.writing
}
</script>

<template>
  <div class="home">
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Compteurs</h2>
        <button class="btn-toggle-all" @click="toggleAll">
          {{ allSelected ? 'Tout désactiver' : 'Tout activer' }}
        </button>
      </div>
      <div class="counter-grid">
        <label
          v-for="c in counters"
          :key="c.id"
          class="counter-card"
          :class="{ selected: selectedCounters.includes(c.id) }"
        >
          <input type="checkbox" v-model="selectedCounters" :value="c.id" class="sr-only" />
          <span class="counter-writing">{{ getCounterWriting(c) }}</span>
          <span class="counter-role">{{ $t(c.roleKey) }}</span>
        </label>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Mode de jeu</h2>
      </div>
      <div class="mode-grid">
        <button
          v-for="m in modes"
          :key="m.id"
          class="mode-card"
          :class="{ selected: selectedMode === m.id }"
          @click="selectedMode = m.id"
        >
          <span class="mode-label">{{ $t(m.labelKey) }}</span>
          <span class="mode-desc">{{ $t(m.descriptionKey) }}</span>
        </button>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Plage de nombres</h2>
      </div>
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
  padding: var(--spacer-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2xl);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacer-xs);
}

.section-title {
  margin-bottom: 0;
}

.btn-toggle-all {
  font-size: var(--text-sm);
  color: var(--primary);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.section-title {
  font-size: var(--text-lg);
  text-transform: uppercase;
  color: var(--text-muted);
}

.sr-only {
  position: absolute;
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
}

/* --- Compteurs --- */
.counter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacer-xs);
}

.counter-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-xs);
  padding: var(--spacer-sm) var(--spacer-xs);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  transition: all 0.15s;
  cursor: pointer;
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

.counter-card.selected .counter-role {
  color: rgba(255, 255, 255, 0.75);
}

.counter-writing {
  font-family: "Klee One", sans-serif;
  font-weight: bold;
  font-size: var(--text-2xl);
  line-height: 1;
  color: var(--primary);
}

.counter-role {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: center;
}

/* --- Modes --- */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacer-xs);
}

.mode-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-xs);
  padding: var(--spacer-sm) var(--spacer-base);
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
  font-size: var(--text-base);
}
.mode-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* --- Plage --- */
.range-row {
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
  flex-wrap: wrap;
}

.range-row label {
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
  font-size: var(--text-sm);
}

.range-row input[type='number'] {
  width: 3.5rem;
  padding: var(--spacer-2xs) var(--spacer-xs);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  font-size: var(--text-sm);
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
  padding: var(--spacer-base);
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: var(--text-base);
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
