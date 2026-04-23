<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Locale } from './i18n'
import { watch } from 'vue'

const { locale } = useI18n()
const route = useRoute()

watch(
  locale,
  (lang) => {
    document.documentElement.lang = lang
  },
  { immediate: true },
)

function setLocale(lang: Locale) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <header v-if="route.name !== 'quiz'">
    <div class="logo">助数詞 Master</div>
    <div class="lang-switcher">
      <button :class="{ active: locale === 'fr' }" @click="setLocale('fr')">FR</button>
      <button :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
      <button :class="{ active: locale === 'ja' }" @click="setLocale('ja')">JP</button>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #5a67d8;
  --primary-light: #eef2ff;
  --primary-dark: #3730a3;
  --correct: #10b981;
  --error: #ef4444;
  --soft: #f59e0b;
  --text: #374151;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  --bg: #ffffff;
  --bg-subtle: #f3f4f6;
  --radius: 0.75rem;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);

  --text-2xs: 0.5rem;
  --text-xs: 0.625rem;
  --text-sm: 0.775rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-spacing-base: 0.05em;

  --spacer-2xs: 0.2rem;
  --spacer-xs: 0.55rem;
  --spacer-sm: 0.8rem;
  --spacer-base: 1rem;
  --spacer-lg: 1.2rem;
  --spacer-xl: 1.45rem;
  --spacer-2xl: 1.75rem;
}

body {
  font-family:
    'BIZ UDPGothic',
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--text);
  background: var(--bg-subtle);
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.logo {
  font-size: var(--text-2xl);
  font-weight: bold;
  color: var(--primary);
}

.lang-switcher {
  display: flex;
  gap: var(--spacer-xs);
}

.lang-switcher button {
  padding: var(--spacer-xs) var(--spacer-sm);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: transparent;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: all 0.15s;
}

.lang-switcher button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  font-weight: 600;
}

main {
  min-height: calc(100vh - 57px);
}

button {
  font-family: inherit;
  cursor: pointer;
}
</style>
