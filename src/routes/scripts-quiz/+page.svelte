<script>
  import gsap from 'gsap';
  import { untrack } from 'svelte';
  import { i18n } from '$lib/i18n';
  import languagesFr from '$lib/data/fr/languages.json';
  import languagesEn from '$lib/data/en/languages.json';
  import Timer from '$lib/components/Timer.svelte';
  import { timerSettings } from '$lib/stores/settings.svelte';
  import { Button } from '$lib/components/ui/button';
  import { LoaderCircle, ArrowRight } from 'lucide-svelte';

  const dataByLang = {
    fr: languagesFr,
    en: languagesEn,
  };

  // primitive uniquement : dédupliquée par Svelte, contrairement aux objets
  const lang = $derived($i18n.language?.startsWith('en') ? 'en' : 'fr');

  const regionsByLang = $derived.by(() => {
    const map = {};
    for (const [region, languages] of Object.entries(dataByLang[lang])) {
      map[region] = Object.entries(languages).map(([code, info]) => ({
        code,
        name: info.name,
        sentences: info.sentences,
      }));
    }
    return map;
  });

  let question = $state(null);
  let selected = $state(null);
  let showFeedback = $state(false);
  let timerKey = $state(0);
  let timerRunning = $state(false);

  let sentenceEl = $state(null);
  let optionsEls = $state([]);
  let timerEl = $state(null);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateQuestion() {
    // on ne pioche que parmi les régions pouvant former une question complète
    const regions = Object.keys(regionsByLang).filter(
      (r) => regionsByLang[r].length >= 5
    );
    if (regions.length === 0) return;

    const region = regions[Math.floor(Math.random() * regions.length)];
    const list = regionsByLang[region];

    const correct = list[Math.floor(Math.random() * list.length)];
    const sentence =
      correct.sentences[Math.floor(Math.random() * correct.sentences.length)];

    const others = shuffle(
      list.filter((l) => l.code !== correct.code).slice(0, 4)
    );
    const options = shuffle([correct, ...others]);

    question = { correct, region, sentence, options };
    selected = null;
    showFeedback = false;

    if (timerSettings.enabled) {
      timerRunning = true;
      timerKey++;
    }
  }

  function handleSelect(option) {
    if (showFeedback) return;
    selected = option;
    showFeedback = true;
    timerRunning = false;

    if (sentenceEl) {
      if (option.code !== question.correct.code) {
        gsap.to(sentenceEl, {
          x: -10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
        });
      } else {
        gsap.to(sentenceEl, {
          scale: 1.03,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        });
      }
    }
  }

  function handleTimeUp() {
    if (!selected && question) {
      selected = question.correct;
      showFeedback = true;
      timerRunning = false;
    }
  }

  $effect(() => {
    // seul déclencheur tracké : la langue (primitive).
    // toute la génération est hors tracking pour éviter tout ping-pong.
    if (!lang) return;
    untrack(() => generateQuestion());
  });

  $effect(() => {
    if (!question) return;
    untrack(() => {
      if (sentenceEl) {
        gsap.fromTo(
          sentenceEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );

        gsap.from(optionsEls.filter(Boolean), {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.2,
        });
      }
    });
  });

  $effect(() => {
    if (!showFeedback) return;
    const handler = (event) => {
      if (event.key === 'Enter') generateQuestion();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  function answerClass(option) {
    if (!showFeedback) return 'h-14 w-full justify-center px-6 text-base';
    if (option.code === question.correct.code)
      return 'h-14 w-full justify-center px-6 text-base bg-success text-success-foreground';
    if (option.code === selected.code)
      return 'h-14 w-full justify-center px-6 text-base bg-destructive text-white dark:bg-destructive dark:text-white';
    return 'h-14 w-full justify-center px-6 text-base opacity-50';
  }
</script>

<svelte:head>
  <title>GeoTrainr - {$i18n.t('navbar.scripts')}</title>
</svelte:head>

<div
  class="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4"
>
  {#if !question}
    <div class="text-muted-foreground flex items-center gap-2">
      <LoaderCircle class="size-5 animate-spin" />
      {$i18n.t('quiz.loading')}
    </div>
  {:else}
    {#if timerSettings.enabled}
      <div bind:this={timerEl} class="mb-4">
        {#key timerKey}
          <Timer
            duration={timerSettings.duration}
            running={timerRunning}
            onTimeUp={handleTimeUp}
          />
        {/key}
      </div>
    {/if}

    <p class="sr-only">{$i18n.t('navbar.scripts')}</p>

    <div
      bind:this={sentenceEl}
      class="border-border bg-card max-w-xl rounded-lg border p-10 text-center shadow-[6px_6px_0_0_var(--border)]"
    >
      <p
        class="font-display text-2xl leading-relaxed font-medium sm:text-3xl"
        dir="auto"
      >
        {question.sentence}
      </p>
    </div>

    <div class="mt-8 grid w-full max-w-md grid-cols-1 gap-3">
      {#each question.options as option, index (option.code)}
        <div bind:this={optionsEls[index]}>
          <Button
            class={answerClass(option)}
            onclick={() => handleSelect(option)}
            disabled={showFeedback}
          >
            {option.name}
          </Button>
        </div>
      {/each}
    </div>

    <div class="mt-6">
      <Button size="lg" disabled={!showFeedback} onclick={generateQuestion}>
        {$i18n.t('quiz.nextQuestion')}
        <ArrowRight class="size-4" />
      </Button>
    </div>
  {/if}
</div>
