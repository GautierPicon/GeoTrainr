<script>
  import { i18n } from '$lib/i18n';
  import { theme, timerSettings } from '$lib/stores/settings.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import * as Card from '$lib/components/ui/card';
  import * as Select from '$lib/components/ui/select';
  import { Separator } from '$lib/components/ui/separator';
  import Toggle from '$lib/components/Toggle.svelte';
  import { Label } from '$lib/components/ui/label';
  import { Sun, Moon, Monitor } from 'lucide-svelte';

  const themes = [
    { value: 'light', label: 'settings.theme.light', icon: Sun },
    { value: 'dark', label: 'settings.theme.dark', icon: Moon },
    { value: 'system', label: 'settings.theme.system', icon: Monitor },
  ];

  const durations = [
    { value: '5', label: '5s' },
    { value: '10', label: '10s' },
    { value: '15', label: '15s' },
    { value: '20', label: '20s' },
    { value: '30', label: '30s' },
  ];
</script>

<svelte:head>
  <title>GeoTrainr — {$i18n.t('settings.title')}</title>
</svelte:head>

<div class="mx-auto w-full max-w-2xl px-4 py-12">
  <h1 class="font-display mb-8 text-4xl font-bold tracking-tight">
    {$i18n.t('settings.title')}
  </h1>

  <Card.Root>
    <Card.Header>
      <Card.Title class="font-display"
        >{$i18n.t('settings.theme.title')}</Card.Title
      >
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-3 gap-3">
        {#each themes as t (t.value)}
          <button
            type="button"
            onclick={() => (theme.current = t.value)}
            class="flex flex-col items-center gap-2 rounded-lg border p-4 transition-all
							{theme.current === t.value
              ? 'border-primary ring-primary/30 ring-2'
              : 'hover:bg-accent'}"
          >
            <t.icon class="size-5" />
            <span class="text-sm font-medium">{$i18n.t(t.label)}</span>
          </button>
        {/each}
      </div>
    </Card.Content>

    <Separator />

    <Card.Header>
      <Card.Title class="font-display"
        >{$i18n.t('settings.language.title')}</Card.Title
      >
    </Card.Header>
    <Card.Content>
      <LanguageSwitcher />
    </Card.Content>

    <Separator />

    <Card.Header>
      <Card.Title class="font-display"
        >{$i18n.t('settings.timer.title')}</Card.Title
      >
    </Card.Header>
    <Card.Content class="flex flex-col gap-4">
      <label
        for="timer-enabled"
        class="flex cursor-pointer items-center justify-between"
      >
        <span class="text-sm font-medium">
          {$i18n.t('settings.timer.enable')}
        </span>
        <Toggle id="timer-enabled" bind:checked={timerSettings.enabled} />
      </label>
      <div
        class="flex items-center justify-between gap-4 transition-opacity
					{timerSettings.enabled ? '' : 'opacity-50'}"
      >
        <Label
          for="timer-duration"
          class={timerSettings.enabled ? '' : 'cursor-not-allowed'}
        >
          {$i18n.t('settings.timer.duration')}
        </Label>
        <Select.Root
          type="single"
          value={String(timerSettings.duration)}
          onValueChange={(v) => v && (timerSettings.duration = parseInt(v, 10))}
        >
          <Select.Trigger
            id="timer-duration"
            class="w-24"
            disabled={!timerSettings.enabled}
          >
            {timerSettings.duration}s
          </Select.Trigger>
          <Select.Content>
            {#each durations as d (d.value)}
              <Select.Item value={d.value}>{d.label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </Card.Content>
  </Card.Root>
</div>
