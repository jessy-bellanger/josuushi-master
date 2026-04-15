<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSentenceFactory } from '@/composables/useSentenceFactory.ts'
import { computed, ref } from 'vue'
import * as wanakana from 'wanakana'

const { t } = useI18n()

const userInput = ref('')

const kanaInput = computed(() => {
  return wanakana.toKana(userInput.value)
})

function toKana() {
  return
}
</script>

<template>
  <div class="single-word-mode">
    <div class="guessing-zone">
      <div class="word-to-guess">
        <span>{{ useSentenceFactory().makeSingleWordSentence(10, 'つ') }}</span>
        <button>{{ t('singleWordMode.hint') }}</button>
      </div>

      <div class="next-word">
        <span>{{ t('singleWordMode.nextWord') }}</span>
      </div>
    </div>

    <div class="answer-zone">
      <div class="user_input">
        <input type="text" :placeholder="t('singleWordMode.inputPlaceholder')" v-model="userInput" />
        <button @click="toKana">{{ t('singleWordMode.validate') }}</button>
      </div>

      <span>{{ kanaInput }}</span>

      <div class="hint">
        <p>{{ t('singleWordMode.softErrorHint') }}</p>
        <p>{{ t('singleWordMode.expectedAnswer') }}</p>
      </div>
    </div>
  </div>
</template>
