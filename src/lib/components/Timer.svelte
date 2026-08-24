<script>
  import gsap from 'gsap';
  import { untrack } from 'svelte';
  import { i18n } from '$lib/i18n';

  let { duration = 10, running = true, onTimeUp = () => {} } = $props();

  const RADIUS = 26;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  let seconds = $state(untrack(() => duration));
  let progress = $state(1);
  let tween;
  const anim = { value: untrack(() => duration) };

  $effect(() => {
    if (!running) {
      tween?.pause();
      return;
    }
    anim.value = duration;
    seconds = duration;
    progress = 1;
    tween?.kill();
    tween = gsap.fromTo(
      anim,
      { value: duration },
      {
        value: 0,
        duration,
        ease: 'none',
        onUpdate: () => {
          seconds = Math.ceil(anim.value);
          progress = anim.value / duration;
        },
        onComplete: onTimeUp,
      }
    );
    return () => tween?.kill();
  });
</script>

<div class="flex items-center gap-3" data-testid="timer">
  <svg class="-rotate-90" width="60" height="60" viewBox="0 0 60 60">
    <circle
      cx="30"
      cy="30"
      r={RADIUS}
      class="stroke-muted fill-none"
      stroke-width="5"
    />
    <circle
      cx="30"
      cy="30"
      r={RADIUS}
      class="stroke-primary fill-none transition-[stroke-dashoffset] duration-200"
      stroke-width="5"
      stroke-linecap="round"
      stroke-dasharray={CIRCUMFERENCE}
      stroke-dashoffset={(1 - progress) * CIRCUMFERENCE}
    />
  </svg>
  <span class="font-display text-lg font-semibold tabular-nums">{seconds}s</span
  >
  <span class="sr-only">{$i18n.t('quiz.timeLeft')}</span>
</div>
