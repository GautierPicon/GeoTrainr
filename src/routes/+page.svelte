<script>
  import gsap from 'gsap';
  import { i18n } from '$lib/i18n';
  import logo from '$lib/assets/logo.svg';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';

  let hero = $state(null);
  let cards = $state([]);
  let steps = $state([]);

  $effect(() => {
    if (!hero) return;
    gsap.from(hero, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' });
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power3.out',
    });
    gsap.from(steps, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      delay: 0.6,
      ease: 'power2.out',
    });
  });

  const stepsData = [
    { key: 'choose', icon: '🎯' },
    { key: 'play', icon: '⚡' },
    { key: 'progress', icon: '📈' },
  ];
</script>

<svelte:head>
  <title>GeoTrainr</title>
  <meta
    name="description"
    content="GeoTrainr — entraînez-vous à reconnaître drapeaux et systèmes d'écriture."
  />
</svelte:head>

<div>
  <section
    class="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-24 pb-20 text-center"
  >
    <div bind:this={hero} class="flex flex-col items-center gap-7">
      <img src={logo} alt="GeoTrainr logo" class="size-24" />
      <h1
        class="font-display max-w-2xl text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl"
      >
        {$i18n.t('homepage.title')}
        <span class="text-primary">{$i18n.t('homepage.titleHighlight')}</span>
      </h1>
      <p class="text-muted-foreground max-w-xl text-lg leading-relaxed">
        {$i18n.t('homepage.description')}
      </p>
    </div>
  </section>

  <section
    class="mx-auto grid w-full max-w-4xl gap-6 px-4 pb-24 sm:grid-cols-2"
  >
    <div bind:this={cards[0]}>
      <Card.Root
        class="h-full border transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
      >
        <Card.Header>
          <Badge variant="outline" class="text-base">🇫🇷</Badge>
          <Card.Title class="font-display text-xl"
            >{$i18n.t('homepage.flags.title')}</Card.Title
          >
          <Card.Description
            >{$i18n.t('homepage.flags.description')}</Card.Description
          >
        </Card.Header>
        <Card.Content>
          <Button href="/flags-quiz" size="lg" class="w-full">
            {$i18n.t('homepage.flags.start')}
          </Button>
        </Card.Content>
      </Card.Root>
    </div>
    <div bind:this={cards[1]}>
      <Card.Root
        class="h-full border transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
      >
        <Card.Header>
          <Badge variant="outline" class="text-base">文字</Badge>
          <Card.Title class="font-display text-xl"
            >{$i18n.t('homepage.scripts.title')}</Card.Title
          >
          <Card.Description
            >{$i18n.t('homepage.scripts.description')}</Card.Description
          >
        </Card.Header>
        <Card.Content>
          <Button href="/scripts-quiz" size="lg" class="w-full">
            {$i18n.t('homepage.scripts.start')}
          </Button>
        </Card.Content>
      </Card.Root>
    </div>
  </section>

  <section class="mx-auto w-full max-w-5xl px-4 pb-28">
    <p
      class="text-muted-foreground mb-10 text-center text-xs font-semibold tracking-[0.2em] uppercase"
    >
      {$i18n.t('homepage.howItWorks.title')}
    </p>
    <div class="grid gap-10 sm:grid-cols-3">
      {#each stepsData as step, index (step.key)}
        <div
          bind:this={steps[index]}
          class="flex flex-col items-center gap-3 text-center"
        >
          <span
            class="font-display text-primary/30 text-4xl font-bold tabular-nums"
          >
            0{index + 1}
          </span>
          <p class="font-semibold">
            {$i18n.t(`homepage.howItWorks.steps.${step.key}.title`)}
          </p>
          <p
            class="text-muted-foreground max-w-[16rem] text-sm leading-relaxed"
          >
            {$i18n.t(`homepage.howItWorks.steps.${step.key}.desc`)}
          </p>
        </div>
      {/each}
    </div>
  </section>
</div>
