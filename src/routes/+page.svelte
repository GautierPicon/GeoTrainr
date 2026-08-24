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
  <title>GeoTrainr — {$i18n.t('homepage.titleHighlight')}</title>
  <meta
    name="description"
    content="GeoTrainr — entraînez-vous à reconnaître drapeaux et systèmes d'écriture."
  />
</svelte:head>

<div class="from-primary/5 via-background to-background bg-linear-to-b">
  <section
    class="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-20 pb-14 text-center"
  >
    <div bind:this={hero} class="flex flex-col items-center gap-6">
      <img src={logo} alt="GeoTrainr logo" class="size-24 drop-shadow-lg" />
      <h1 class="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        {$i18n.t('homepage.title')}
        <span class="text-primary">{$i18n.t('homepage.titleHighlight')}</span>
      </h1>
      <p class="text-muted-foreground max-w-xl text-lg">
        {$i18n.t('homepage.description')}
      </p>
    </div>
  </section>

  <section
    class="mx-auto grid w-full max-w-4xl gap-6 px-4 pb-16 sm:grid-cols-2"
  >
    <div bind:this={cards[0]}>
      <Card.Root class="h-full transition-shadow hover:shadow-lg">
        <Card.Header>
          <Badge variant="secondary" class="w-fit">🇫🇷</Badge>
          <Card.Title>{$i18n.t('homepage.flags.title')}</Card.Title>
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
      <Card.Root class="h-full transition-shadow hover:shadow-lg">
        <Card.Header>
          <Badge variant="secondary" class="w-fit">文字</Badge>
          <Card.Title>{$i18n.t('homepage.scripts.title')}</Card.Title>
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

  <section class="mx-auto w-full max-w-5xl px-4 pb-24">
    <h2 class="mb-8 text-center text-2xl font-bold tracking-tight">
      {$i18n.t('homepage.howItWorks.title')}
    </h2>
    <div class="grid gap-6 sm:grid-cols-3">
      {#each stepsData as step, index (step.key)}
        <div
          bind:this={steps[index]}
          class="flex flex-col items-center gap-3 text-center"
        >
          <div
            class="bg-secondary flex size-12 items-center justify-center rounded-full text-xl"
          >
            {step.icon}
          </div>
          <p class="font-semibold">
            {$i18n.t(`homepage.howItWorks.steps.${step.key}.title`)}
          </p>
          <p class="text-muted-foreground text-sm">
            {$i18n.t(`homepage.howItWorks.steps.${step.key}.desc`)}
          </p>
        </div>
      {/each}
    </div>
  </section>
</div>
