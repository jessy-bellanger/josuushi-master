<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Locale } from './i18n'

const { t, locale } = useI18n()

function setLocale(lang: Locale) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <header>
    <div class="logo">助数詞 Master</div>

    <nav>
      <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
    </nav>

    <div class="lang-switcher">
      <button :class="{ active: locale === 'fr' }" @click="setLocale('fr')">FR</button>
      <button :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer></footer>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 0.25rem;
}

.lang-switcher button {
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}

.lang-switcher button.active {
  font-weight: bold;
}
</style>
