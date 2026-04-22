<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelMin: number
  modelMax: number
  min?: number
  max?: number
}>(), { min: 1, max: 10 })

const emit = defineEmits<{
  'update:modelMin': [v: number]
  'update:modelMax': [v: number]
}>()

const range = computed(() => Math.abs(props.max - props.min))
const pct   = (v: number) => (v - props.min) / range.value * 100

const trackStyle = computed(() => ({
  background: `linear-gradient(to right,
    var(--border) ${pct(props.modelMin)}%,
    var(--primary) ${pct(props.modelMin)}%,
    var(--primary) ${pct(props.modelMax)}%,
    var(--border) ${pct(props.modelMax)}%)`
}))

// When both handles sit at the same position, put the min handle on top
// so the user can drag it leftward to separate them.
const minZ = computed(() => props.modelMin >= props.modelMax ? 2 : 1)

const ticks = computed(() =>
  Array.from({ length: range.value + 1 }, (_, i) => props.min + i)
)

function onMin(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  emit('update:modelMin', Math.min(v, props.modelMax))
}

function onMax(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  emit('update:modelMax', Math.max(v, props.modelMin))
}
</script>

<template>
  <div class="range-slider">

    <!-- Track + handles -->
    <div class="track-wrapper">
      <div class="track" :style="trackStyle" />

      <input
        type="range"
        class="handle"
        :style="{ zIndex: minZ }"
        :min="min" :max="max" :step="1"
        :value="modelMin"
        @input="onMin"
      />
      <input
        type="range"
        class="handle"
        :style="{ zIndex: minZ === 2 ? 1 : 2 }"
        :min="min" :max="max" :step="1"
        :value="modelMax"
        @input="onMax"
      />
    </div>

    <!-- Tick marks + labels -->
    <div class="ticks">
      <span v-for="t in ticks" :key="t" class="tick">
        <span class="tick-mark" />
        <span class="tick-label">{{ t }}</span>
      </span>
    </div>

  </div>
</template>

<style scoped>
.range-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.25rem 0;
}

/* ── Track ─────────────────────────────────────── */
.track-wrapper {
  position: relative;
  height: 2.25rem; /* thumb hit area */
  display: flex;
  align-items: center;
}

.track {
  position: absolute;
  width: 100%;
  height: 5px;
  border-radius: 3px;
  pointer-events: none;
}

/* ── Handles ────────────────────────────────────── */
.handle {
  position: absolute;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  pointer-events: none; /* only the thumb is interactive */
  margin: 0;
  padding: 0;
}

/* Webkit thumb */
.handle::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  pointer-events: all;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: white;
  border: 2.5px solid var(--primary);
  box-shadow: 0 1px 4px rgba(0,0,0,.18);
  cursor: grab;
  transition: border-color .15s, box-shadow .15s;
}

.handle::-webkit-slider-thumb:hover,
.handle::-webkit-slider-thumb:active {
  background: var(--primary-light);
  box-shadow: 0 0 0 4px rgba(79,70,229,.15), 0 1px 4px rgba(0,0,0,.18);
}

.handle::-webkit-slider-thumb:active {
  cursor: grabbing;
}

/* Firefox thumb */
.handle::-moz-range-thumb {
  pointer-events: all;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: white;
  border: 2.5px solid var(--primary);
  box-shadow: 0 1px 4px rgba(0,0,0,.18);
  cursor: grab;
  transition: border-color .15s, box-shadow .15s;
}

.handle::-moz-range-thumb:hover,
.handle::-moz-range-thumb:active {
  background: var(--primary-light);
  box-shadow: 0 0 0 4px rgba(79,70,229,.15), 0 1px 4px rgba(0,0,0,.18);
}

/* Hide default track in all browsers */
.handle::-webkit-slider-runnable-track { background: transparent; }
.handle::-moz-range-track             { background: transparent; }

/* ── Ticks ──────────────────────────────────────── */
.ticks {
  display: flex;
  justify-content: space-between;
  padding: 0 calc(0.625rem); /* half of thumb width to align with thumb centre */
}

.tick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.tick-mark {
  display: block;
  width: 1px;
  height: 5px;
  background: var(--border);
  border-radius: 1px;
}

.tick-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
