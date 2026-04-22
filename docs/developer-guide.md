# Josuushi Master — Documentation développeur

## Contexte & Vision

**Josuushi Master** est une application web d'entraînement aux compteurs japonais (助数詞).
Elle s'adresse à deux audiences :
- **Apprenants du japonais** : apprendre les lectures correctes et les irrégularités
- **Natifs japonais** : réviser les compteurs rares ou peu fréquents

Le POC existant (branche `main`) est un prototype non abouti. Il sera remplacé par une réécriture
complète. Le stack technique est conservé : Vue 3 + TypeScript + Pinia + vue-i18n + Vite + wanakana.

---

## Audiences & Cas d'usage

| Audience           | Besoin principal                                 | Particularité                                                                       |
|--------------------|--------------------------------------------------|-------------------------------------------------------------------------------------|
| Apprenant débutant | Mémoriser les lectures de base                   | A besoin de hints — saisie en kana uniquement (conversion automatique via wanakana) |
| Apprenant avancé   | Maîtriser les irrégularités, fusions phonétiques | Hints disponibles à la demande                                                      |
| Natif japonais     | Réviser des compteurs peu courants               | UI en japonais                                                                      |

---

## Concept clé : la lecture fusionnée (音便 / onbin)

La grande difficulté des compteurs japonais est que **nombre + compteur forment parfois une
unité phonétique irréductible**, différente de la simple concaténation :

- 10 + つ → **とお** (tō), PAS ~~じゅうつ~~
- 1 + 匹 → **いっぴき** (ippiki), PAS ~~いちひき~~
- 3 + 匹 → **さんびき** (sanbiki), PAS ~~さんひき~~

La lecture d'une combinaison nombre+compteur peut donc être :
1. **Régulière** : lecture du nombre + lecture du compteur concaténées
2. **Irrégulière partielle** : un seul des deux éléments change (assimilation consonantique)
3. **Irrégulière totale** : la combinaison a une lecture unique et mémorisable en tant que telle

Le modèle de données doit traiter chaque combinaison (nombre, compteur) comme une unité
potentiellement irrégulière.

---

## Modèle de données

### `Counter`

```typescript
interface Counter {
  id: string                              // slug unique, ex: 'tsu', 'hiki'
  writing: string                         // écriture japonaise : 'つ', '匹'
  defaultReading: string                  // lecture par défaut (pour les réguliers)
  nouns: Noun[]                           // noms associés pour la génération de phrases
  sentencePatterns: SentencePattern[]     // patterns de phrases pour ce compteur
  particularReadings: Partial<Record<CounterNumber, Reading>>
}
```

### `Reading` — Lecture d'une combinaison (nombre, compteur)

```typescript
interface Reading {
  pronunciations: string[]    // réponses correctes en hiragana (ex: ['さんびき'])
  softErrors: string[]        // réponses "presque correctes" en hiragana (['さんぴき'])
  softErrorHint?: string      // clé i18n du message d'aide pour les softErrors
  writing?: string            // écriture spéciale si différente de la concaténation standard
                              // ex: 'とお' pour (10, つ) — utilisé dans le display
}
```

> **Convention** : toutes les entrées dans `pronunciations` et `softErrors` sont en **hiragana**.
> Les formes romaji ne sont stockées nulle part — elles sont calculées à l'affichage si nécessaire
> (via wanakana.toRomaji()).

### `Noun` — Nom associé à un compteur

```typescript
interface Noun {
  writing: string             // kanji/kana : '猫', 'りんご'
  reading: string             // hiragana : 'ねこ'
  translations: {
    fr: string
    en: string
    ja: string                // description simple en japonais pour les natifs
  }
}
```

### `SentencePattern` — Template de phrase

```typescript
interface SentencePattern {
  template: string            // ex: '{noun}が{counter}います'
                              // ex: '{counter}の{noun}があります'
}
// {counter} représente le bloc nombre+compteur complet (ex: "3匹", "とお")
// {noun} est remplacé par noun.writing
```

### `Sentence` — Phrase générée (objet immuable)

```typescript
interface Sentence {
  display: string             // phrase complète affichée, ex: '猫が3匹います'
  counterDisplay: string      // le fragment nombre+compteur tel qu'affiché, ex: '3匹' ou 'とお'
                              // sert à construire le highlight dans SentenceDisplay.vue
  number: CounterNumber       // le nombre utilisé
  counter: Counter            // le compteur utilisé
  noun: Noun                  // le nom utilisé
  correctAnswers: string[]    // hiragana acceptés pour (number, counter), ex: ['さんびき']
  softErrors: string[]        // hiragana déclenchant le softErrorHint
  softErrorHint?: string      // clé i18n du message
}
```

### `CounterNumber`

```typescript
type CounterNumber = number | 'nan'
// 'nan' = 何 (combien ?) — permet de s'entraîner sur la question "combien ?"
```

---

## Génération de phrases

**Principe :**
Pour chaque compteur, une liste de noms (`nouns`) et de patterns (`sentencePatterns`) est définie
dans les données. La génération est entièrement déterministe et ne nécessite pas de NLP.

**Algorithme :**
```
1. Choisir un compteur (selon la sélection de l'utilisateur)
2. Choisir un nombre (selon la plage choisie)
3. Choisir aléatoirement un Noun dans counter.nouns
4. Choisir aléatoirement un SentencePattern dans counter.sentencePatterns
5. Résoudre la lecture (nombre, compteur) → Reading
6. Construire counterDisplay :
     si reading.writing existe → counterDisplay = reading.writing  (ex: 'とお')
     sinon                     → counterDisplay = number + counter.writing (ex: '3匹')
7. Construire display : remplacer {noun} et {counter} dans le template
8. Retourner l'objet Sentence complet
```

**Résolution de la lecture :**
```
function resolveReading(counter, number) → Reading:
  if counter.particularReadings[number] exists:
    return counter.particularReadings[number]
  else:
    return {
      pronunciations: [numbers[number].reading + counter.defaultReading],
      softErrors: [],
    }
```

**Composable :** `useSentenceFactory()`
- `generateSentence(counterId: string, number: CounterNumber) → Sentence`
- `generateRandom(counterIds: string[], numberRange: [number, number], includeNan: boolean) → Sentence`

---

## Modes de jeu

### 1. Saisie libre (`FreeInputMode`)
L'utilisateur voit la phrase avec le nombre+compteur mis en évidence et tape la lecture en
romaji ou kana (converti en temps réel via wanakana).

```
Affichage : 「猫が[3匹]います」
Question : Comment lit-on 3匹 ?
Input : [___________] → converti live en kana via wanakana
```

**Validation :**
1. Normaliser l'input (voir section Validation)
2. Si match dans `correctAnswers` → correct, phrase suivante
3. Si match dans `softErrors` → afficher `softErrorHint`, bloquer la progression
4. Sinon → incorrect, afficher la réponse attendue

### 2. Mode rafale (`BurstMode`)
L'utilisateur voit le combo nombre+compteur actuel et le suivant en aperçu, sans phrase de
contexte. Il doit lire et valider le maximum de combos en **30 secondes**.

```
┌─────────────────────────┐
│  ⏱ 23s            ✓ 7   │
│                         │
│          1本            │  ← combo suivant (petit, légèrement transparent, au-dessus)
│                         │
│        [ 3匹 ]          │  ← combo actuel (grand)
│     [___________]       │  ← saisie wanakana
└─────────────────────────┘
```

**Animation de transition (style Star Wars crawl) :**
À chaque avance, le combo suivant glisse vers le bas pour prendre la place du combo actuel.
L'œil n'a qu'une courte distance à parcourir vers le haut pour lire l'aperçu, puis le suit
naturellement vers le bas jusqu'à la zone de saisie. Implémenter avec une transition CSS
`transform: translateY` ou via `<Transition>` Vue avec des classes `slide-down`.

**Règles :**
- Avance automatique dès que la réponse correspond à `correctAnswers` (pas de bouton Valider)
- Pas de soft error — une réponse est correcte ou ratée, sans hint
- Skip : Échap, Tab, ou Entrée avec le champ vide → combo compté comme raté, passage au suivant
- **Debounce sur Entrée : 200 ms** — empêche qu'un double-tap involontaire valide le combo actuel ET skippe le suivant. À implémenter dans `BurstMode.vue` sur le handler de la touche Entrée.
- La session se termine quand le timer atteint 0
- Score final : nombre de bonnes réponses, nombre d'erreurs (erreurs + skips), ratio bonnes/erreurs
- Le ratio est calculé, pas stocké : `correctCount / (correctCount + errorCount)`

**Type dédié :** `CounterCombo` (pas de `Sentence` — pas de nom ni de phrase)

**État Pinia :** `BurstSession` (séparé de `QuizSession` car le timer est de l'état réactif)

### 3. QCM (`MultipleChoiceMode`)
4 options proposées, dont 1 correcte. Les distracteurs sont construits selon un ordre de
priorité défini (voir section Distracteurs).

```
Affichage : 「猫が[3匹]います」
Options :
  ○ さんびき  ✓  (correcte)
  ○ さんぴき     (softError du même compteur — distracteur prioritaire)
  ○ さんぼん     (lecture de 3 + 本 — même nombre, autre compteur)
  ○ みっつ       (lecture de 3 + つ — même nombre, autre compteur)
```

---

## Scoring (modes saisie libre, QCM, choix du compteur)

Chaque question produit un `QuestionResult` qui track trois événements indépendants :
si l'utilisateur a demandé un hint, combien de soft errors il a déclenchées, et s'il a
finalement répondu correctement.

| Correct  | Hint   | Soft errors  | Score    |
|----------|--------|--------------|----------|
| ✓        | non    | 0            | **1**    |
| ✓        | oui    | 0            | **0.5**  |
| ✓        | non    | 1            | **0.5**  |
| ✓        | oui    | 1            | **0.25** |
| ✓        | —      | ≥ 2          | **0**    |
| ✗        | —      | —            | **0**    |

```
function computeScore(result: QuestionResult): number {
  if (!result.answeredCorrectly || result.softErrorCount > 1) return 0
  if (result.hintUsed && result.softErrorCount === 1) return 0.25
  if (result.hintUsed || result.softErrorCount === 1) return 0.5
  return 1
}
```

Le score est stocké directement dans `QuestionResult.score` (calculé à la validation finale).
Le score total de session = somme des scores / nombre de questions.

> **Mode rafale :** pas de scoring nuancé — chaque combo est correct (1) ou raté (0).
> Les hints n'existent pas dans ce mode, les soft errors non plus.

---

## Validation des réponses

### Normalisation (saisie libre)

```typescript
function normalize(input: string): string {
  return wanakana.toHiragana(input).trim()
}
```

Toutes les `correctAnswers` sont stockées en hiragana. La normalisation convertit :
- romaji → hiragana (`sanbiki` → `さんびき`)
- katakana → hiragana (`サンビキ` → `さんびき`)
- espace en début/fin → supprimé

**Cas limites wanakana à connaître :**

| Input utilisateur  | Résultat wanakana.toHiragana()  | Attendu   | Conforme ?                       |
|--------------------|---------------------------------|-----------|----------------------------------|
| `sanbiki`          | `さんびき`                          | `さんびき`    | ✓                                |
| `ippiki`           | `いっぴき`                          | `いっぴき`    | ✓                                |
| `too`              | `とお`                            | `とお`      | ✓                                |
| `to-`              | `とー`                            | `とお`      | ✗ → stocker `とー` comme softError |
| `juppiki`          | `じゅっぴき`                         | `じゅっぴき`   | ✓                                |
| `juupiki`          | `じゅうぴき`                         | —         | softError                        |
| `nn`               | `ん`                             | —         | cas marginal, acceptable         |

**Règle** : les variantes d'entrée problématiques (ex: `to-` pour `とお`) sont gérées en les
ajoutant aux `softErrors` avec un hint approprié, plutôt qu'en complexifiant la normalisation.

### Niveaux de résultat

```typescript
type AnswerResult = 'correct' | 'soft-error' | 'incorrect'
```

### Composable : `useAnswerValidator()`

```typescript
function validate(input: string, sentence: Sentence): AnswerResult {
  const normalized = normalize(input)
  if (sentence.correctAnswers.includes(normalized)) return 'correct'
  if (sentence.softErrors.includes(normalized)) return 'soft-error'
  return 'incorrect'
}
```

---

## Audio (TTS)

La lecture audio joue la phrase ou le combo en remplaçant le fragment nombre+compteur par
**なになに**, afin de donner le contexte sans révéler la réponse.

```
"猫が3匹います" → prononcé : "猫がなになにいます"
"3匹"           → prononcé : "なになに"
```

### Déclenchement

Deux modes, contrôlés par `UserSettings.autoPlayAudio` :
- **Auto** : la phrase/combo est lu automatiquement à l'apparition de chaque question.
  Disponible dans **tous les modes**, y compris le mode rafale.
- **À la demande** : l'utilisateur clique une icône 🔊 (`AudioButton.vue`).
  **Non disponible en mode rafale** — un geste supplémentaire briserait le rythme.

### Disponibilité et UI

Lorsque `isAvailable` est `false` :
- Le bouton 🔊 est masqué
- L'option « lecture automatique » dans les paramètres est **désactivée** (grisée) avec une
  **tooltip** expliquant la cause, ex. : *« Voix japonaise non disponible dans ce navigateur »*

Les deux surfaces (bouton et option) doivent être conditionnées indépendamment par
`isAvailable`, car l'option paramètre peut être visible même si le bouton est absent (et
vice-versa selon le mode).

### Implémentation — Web Speech API (MVP)

```typescript
// composable : useAudio()
function speak(text: string): void {
  window.speechSynthesis.cancel()                    // interrompt toute lecture en cours
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

function speakSentence(sentence: Sentence): void {
  speak(sentence.display.replace(sentence.counterDisplay, 'なになに'))
}

function speakCombo(combo: CounterCombo): void {
  speak('なになに')                                   // en mode rafale : non utilisé
}

// Vérifie la disponibilité avant d'afficher le bouton / l'option auto
const isAvailable = computed(() =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  speechSynthesis.getVoices().some(v => v.lang.startsWith('ja'))
)
```

Si `isAvailable` est `false` : bouton 🔊 masqué, option auto-écoute grisée avec tooltip.

### Post-MVP

Remplacer Web Speech API par **Google Cloud TTS** (voix WaveNet ou Neural2) pour une
qualité homogène sur tous les environnements. Nécessite un backend — cohérent avec les
évolutions post-MVP déjà prévues.

---

## Algorithme de génération des distracteurs (QCM)

Les distracteurs doivent être **plausibles** (pas trop faciles) et **non-ambigus** (ne pas
accidentellement être corrects).

**Ordre de priorité pour remplir les 3 emplacements de distracteurs :**

```
1. softErrors de la même combinaison (nombre, compteur)
   → ce sont les erreurs les plus courantes, maximise l'intérêt pédagogique

2. correctAnswers d'autres compteurs pour le même nombre
   → même nombre, compteur différent (ex: 3本, 3枚 pour distraire de 3匹)
   → pioche dans les compteurs présents dans la session

3. correctAnswers du même compteur pour des nombres proches (±1, ±2)
   → même compteur, nombre différent

4. Si toujours insuffisant : lectures aléatoires d'autres combinaisons présentes en session
```

**Règles de déduplication :**
- Ne jamais inclure une valeur présente dans `sentence.correctAnswers`
- Ne jamais répéter deux fois le même distracteur
- Si après épuisement des priorités il manque des distracteurs → réduire à 3 options (1 correcte + 2 distracteurs) plutôt que de mettre des entrées vides

---

## Affichage et highlight du fragment nombre+compteur

Le composant `SentenceDisplay.vue` doit mettre en évidence visuellement le bloc
nombre+compteur dans la phrase (c'est ce que l'utilisateur doit lire).

**Mécanisme :** la propriété `sentence.counterDisplay` contient exactement le fragment à
surligner (ex: `'3匹'` ou `'とお'`). Le composant split le `display` sur ce fragment :

```typescript
// dans SentenceDisplay.vue
const parts = computed(() => {
  const [before, after] = props.sentence.display.split(props.sentence.counterDisplay)
  return { before, target: props.sentence.counterDisplay, after }
})
```

```html
<span>{{ parts.before }}</span>
<span class="highlight">{{ parts.target }}</span>
<span>{{ parts.after }}</span>
```

**Contrainte sur les données** : `counterDisplay` doit apparaître **exactement une fois** dans
`display`. Le générateur de phrases doit garantir cela (le template place `{counter}` une seule
fois et `counterDisplay` est dérivé de la même résolution).

---

## Sélection des compteurs pour le MVP

Commencer par **8 compteurs courants**, bien fournis en noms et patterns, plutôt que de
viser l'exhaustivité. Critères de sélection : fréquence d'usage, richesse des irrégularités,
diversité des catégories grammaticales.

| Compteur | Catégorie               | Irrégularités notables                                                           |
|----------|-------------------------|----------------------------------------------------------------------------------|
| つ        | Objets généraux (wa-go) | 1〜9 irréguliers sauf 7 (ななつ = なな+つ), 10→とお (つ disparaît) ; 何→いくつ (irrég. totale) |
| 個 (こ)    | Petits objets           | 1→いっこ, 6→ろっこ, 8→はっこ, 10→じゅっこ ; 何→なんこ (régulier)                                  |
| 匹 (ひき)   | Petits animaux          | 1→いっぴき, 3→さんびき, 6→ろっぴき, 8→はっぴき, 10→じゅっぴき ; 何→なんびき (ひ→び)                          |
| 本 (ほん)   | Objets longs            | 1→いっぽん, 3→さんぼん, 6→ろっぽん, 8→はっぽん, 10→じゅっぽん ; 何→なんぼん (ほ→ぼ)                          |
| 枚 (まい)   | Objets plats            | Entièrement régulier ; 何→なんまい (régulier)                                         |
| 冊 (さつ)   | Livres                  | 1→いっさつ, 8→はっさつ, 10→じゅっさつ ; 何→なんさつ (régulier)                                     |
| 台 (だい)   | Machines, véhicules     | Entièrement régulier ; 何→なんだい (régulier)                                         |
| 人 (にん/り) | Personnes               | 1→ひとり, 2→ふたり (irrég. totales), 4→よにん (よ et non よん) ; 何→なんにん (régulier)           |

---

## Architecture technique

### Stack

| Outil                   | Rôle                     |
|-------------------------|--------------------------|
| Vue 3 (Composition API) | Framework UI             |
| TypeScript (strict)     | Typage                   |
| Pinia                   | State management         |
| Vue Router              | Navigation               |
| vue-i18n                | i18n (FR / EN / JA)      |
| wanakana                | Conversion romaji ↔ kana |
| Vite                    | Build                    |
| Playwright              | Tests E2E                |

### Structure des fichiers

```
src/
│
├── components/
│   └── ui/
│       ├── AudioButton.vue         # icône 🔊, masquée si voix JP indisponible
│       └── ...                     # composants génériques réutilisables (boutons, badges…)
│
├── composables/
│   ├── useSentenceFactory.ts       # generateSentence(), generateRandom()
│   ├── useAnswerValidator.ts       # validate(), normalize()
│   └── useQuizSession.ts           # orchestration d'une session de quiz
│
├── data/
│   ├── counters/
│   │   ├── index.ts                # exporte CountersData (Record<string, Counter>)
│   │   ├── tsu.ts                  # つ avec nouns et sentencePatterns
│   │   ├── hiki.ts                 # 匹 avec nouns et sentencePatterns
│   │   └── ...                     # un fichier par compteur
│   └── numbers.ts                  # lectures des nombres (1-10, nan)
│
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── fr.json
│       ├── en.json
│       └── ja.json
│
├── router/
│   └── index.ts                    # routes : /, /quiz, /results
│
├── stores/
│   ├── quiz.ts                     # état de la session en cours (Pinia)
│   └── settings.ts                 # préférences utilisateur persistées (localStorage)
│
├── types/
│   ├── Counter.ts                  # Counter, Reading, Noun, SentencePattern, CounterNumber
│   ├── Sentence.ts                 # Sentence, AnswerResult
│   └── Session.ts                  # QuizSession, QuizMode, SessionConfig
│
├── views/
│   ├── HomeView.vue                # sélection des compteurs, du mode, de la plage de nombres
│   ├── QuizView.vue                # vue conteneur du quiz (switche entre les modes)
│   ├── ResultsView.vue             # résultats de fin de session
│   └── quiz/                       # composants propres à QuizView (feature-based)
│       ├── SentenceDisplay.vue     # affichage de la phrase avec highlight du compteur
│       ├── FreeInputMode.vue       # champ de saisie + wanakana
│       ├── MultipleChoiceMode.vue  # 4 boutons de réponse
│       ├── CounterChoiceMode.vue   # choix du compteur (QCM sur l'écriture)
│       ├── BurstMode.vue           # mode rafale (timer + avance automatique)
│       └── HintPanel.vue           # panel de hints (masqué par défaut)
│
├── App.vue
└── main.ts
```

### État Pinia : `quiz.ts`

```typescript
interface QuizSession {
  mode: 'free-input' | 'multiple-choice' | 'counter-choice' | 'burst'
  selectedCounterIds: string[]
  numberRange: [number, number]    // ex: [1, 10]
  includeNan: boolean
  sentences: Sentence[]            // file de phrases générées
  currentIndex: number
  results: AnswerResult[]          // un résultat par phrase
}
```

### État Pinia : `settings.ts`

```typescript
interface UserSettings {
  locale: 'fr' | 'en' | 'ja'
  showHiragana: boolean            // affiche les hiragana dans le display
  hintsEnabled: boolean
}
// Persisté dans localStorage
```

---

## Internationalisation (i18n)

### Principe
- **Contenu japonais** (noms, phrases, compteurs) : toujours en japonais, jamais traduit
- **Interface utilisateur** : FR, EN, JA
- **Métadonnées des noms** (`Noun.translations`) : traduit en FR, EN, JA pour afficher
  la signification du mot dans la langue de l'utilisateur

### Ajout de `ja.json`
Nouveau fichier de locale à créer. L'interface japonaise utilisera du japonais simple et
accessible (pour natifs et apprenants avancés).

---

## Périmètre MVP vs. Évolutions

### MVP (SPA statique)
- [x] 4 modes de jeu : saisie libre, QCM, choix du compteur, rafale (30s)
- [x] Sélection des compteurs à réviser
- [x] Sélection de la plage de nombres
- [x] Génération de phrases par templates contextuels
- [x] Validation avec softErrors
- [x] Hints (masqués par défaut)
- [x] Interface FR / EN / JA
- [x] Lecture audio TTS (Web Speech API) — auto ou à la demande, avec なになに pour le trou
- [x] Préférences persistées en localStorage (locale, hintsEnabled, autoPlayAudio)
- [x] Résultats de fin de session (score, détail par question)

### Évolutions post-MVP (nécessitent un backend)
- [ ] Comptes utilisateurs
- [ ] Répétition espacée (SRS type Anki)
- [ ] Historique de progression
- [ ] Leaderboard / mode compétitif
- [ ] Audio (prononciation des phrases)
- [ ] Éditeur de contenu (ajouter des noms, des patterns)
