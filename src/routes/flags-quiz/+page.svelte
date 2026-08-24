<script>
  import gsap from 'gsap';
  import { untrack } from 'svelte';
  import { i18n } from '$lib/i18n';
  import flagsFr from '$lib/data/fr/flags.json';
  import flagsEn from '$lib/data/en/flags.json';
  import Favicon from '$lib/components/Favicon.svelte';
  import Timer from '$lib/components/Timer.svelte';
  import { timerSettings } from '$lib/stores/settings.svelte';
  import { Button } from '$lib/components/ui/button';
  import { LoaderCircle, ArrowRight } from 'lucide-svelte';

  const dataByLang = {
    fr: flagsFr,
    en: flagsEn,
  };

  // primitive uniquement : dédupliquée par Svelte, contrairement aux objets
  const lang = $derived($i18n.language?.startsWith('en') ? 'en' : 'fr');

  const countriesByContinent = $derived.by(() => {
    const map = {};
    for (const [continent, countries] of Object.entries(dataByLang[lang])) {
      map[continent] = Object.entries(countries).map(([code, name]) => ({
        code,
        name,
        continent,
      }));
    }
    return map;
  });

  let question = $state(null);
  let selected = $state(null);
  let showFeedback = $state(false);
  let timerKey = $state(0);
  let timerRunning = $state(false);

  let flagEl = $state(null);
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
    // certains continents ont moins de 5 pays (ex. "International Organizations") :
    // on ne pioche que parmi ceux qui peuvent former une question complète
    const continents = Object.keys(countriesByContinent).filter(
      (c) => countriesByContinent[c].length >= 5
    );
    if (continents.length === 0) return;

    const continent = continents[Math.floor(Math.random() * continents.length)];
    const list = countriesByContinent[continent];

    const correct = list[Math.floor(Math.random() * list.length)];
    const others = shuffle(
      list.filter((c) => c.code !== correct.code).slice(0, 4)
    );
    const options = shuffle([correct, ...others]);

    question = { correct, continent, options };
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

    if (flagEl) {
      if (option.code !== question.correct.code) {
        gsap.to(flagEl, {
          x: -10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
        });
      } else {
        gsap.to(flagEl, {
          scale: 1.08,
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
      if (flagEl) {
        gsap.fromTo(
          flagEl,
          { scale: 0.7, opacity: 0, rotationY: -90 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.6,
            ease: 'back.out(1.5)',
          }
        );

        if (timerEl) {
          gsap.from(timerEl, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.out',
          });
        }

        gsap.from(optionsEls.filter(Boolean), {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.3,
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
    if (!showFeedback)
      return 'h-14 text-base justify-start px-6 hover:bg-accent';
    if (option.code === question.correct.code)
      return 'h-14 text-base justify-start px-6 bg-success text-success-foreground hover:bg-success';
    if (option.code === selected.code)
      return 'h-14 text-base justify-start px-6 bg-destructive text-white hover:bg-destructive dark:bg-destructive dark:text-white';
    return 'h-14 text-base justify-start px-6 opacity-50 hover:bg-accent';
  }
</script>

<div
  class="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4"
>
  {#if !question}
    <div class="text-muted-foreground flex items-center gap-2">
      <LoaderCircle class="size-5 animate-spin" />
      {$i18n.t('quiz.loading')}
    </div>
  {:else}
    <Favicon code={question.correct.code} />

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

    <img
      bind:this={flagEl}
      src="https://flagcdn.com/{question.correct.code}.svg"
      alt={question.correct.name}
      class="mb-8 h-auto max-h-64 w-auto rounded-lg border object-contain shadow-[6px_6px_0_0_var(--border)] lg:max-h-72"
    />

    <div class="grid w-full max-w-md grid-cols-1 gap-3">
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
