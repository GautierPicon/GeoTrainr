<script>
  import { i18n } from '$lib/i18n';
  import * as Select from '$lib/components/ui/select';
  import defaultI18next from '$lib/i18n';

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
  ];

  let value = $derived($i18n.language?.startsWith('en') ? 'en' : 'fr');

  function handleChange(v) {
    defaultI18next.changeLanguage(v);
  }
</script>

<Select.Root type="single" {value} onValueChange={handleChange}>
  <Select.Trigger class="w-40" aria-label="Language">
    {languages.find((l) => l.value === value)?.label ?? value}
  </Select.Trigger>
  <Select.Content>
    {#each languages as lang (lang.value)}
      <Select.Item value={lang.value}>{lang.label}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
