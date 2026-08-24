<script>
  import { page } from '$app/state';
  import { i18n } from '$lib/i18n';
  import logo from '$lib/assets/logo.svg';
  import { Button } from '$lib/components/ui/button';

  const links = [
    { href: '/', key: 'navbar.home' },
    { href: '/flags-quiz', key: 'navbar.flags' },
    { href: '/scripts-quiz', key: 'navbar.scripts' },
    { href: '/settings', key: 'navbar.settings' },
  ];
</script>

<header
  class="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md"
>
  <div
    class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4"
  >
    <a
      href="/"
      class="flex items-center gap-2.5 transition-opacity hover:opacity-80"
    >
      <img src={logo} alt="GeoTrainr" class="size-9" />
      <span class="hidden text-lg font-bold tracking-tight sm:block"
        >GeoTrainr</span
      >
    </a>

    <nav class="flex items-center gap-1">
      {#each links as link (link.href)}
        <Button
          variant={page.url.pathname === link.href ? 'secondary' : 'ghost'}
          size="sm"
          href={link.href}
        >
          {$i18n.t(link.key)}
        </Button>
      {/each}
    </nav>
  </div>
</header>
