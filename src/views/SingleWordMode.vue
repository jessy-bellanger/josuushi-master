<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="single-word-mode">
    <div class="guessing-zone">
      <div class="word-to-guess">
        <span>{{ t('singleWordMode.wordToGuess') }}</span>
        <button>{{ t('singleWordMode.hint') }}</button>
      </div>

      <div class="next-word">
        <span>{{ t('singleWordMode.nextWord') }}</span>
      </div>
    </div>

    <div class="answer-zone">
      <div class="user_input">
        <input type="text" :placeholder="t('singleWordMode.inputPlaceholder')" />
        <button>{{ t('singleWordMode.validate') }}</button>
      </div>

      <div class="hint">
        <p>{{ t('singleWordMode.softErrorHint') }}</p>
        <p>{{ t('singleWordMode.expectedAnswer') }}</p>
      </div>
    </div>
  </div>
</template>
