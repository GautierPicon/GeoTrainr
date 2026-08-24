<script>
  import { page } from '$app/state';
  import { i18n } from '$lib/i18n';
  import logo from '$lib/assets/logo.svg';

  const links = [
    { href: '/', key: 'navbar.home' },
    { href: '/flags-quiz', key: 'navbar.flags' },
    { href: '/scripts-quiz', key: 'navbar.scripts' },
    { href: '/settings', key: 'navbar.settings' },
  ];
</script>

<header
  class="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md"
>
  <div
    class="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4"
  >
    <a
      href="/"
      class="flex items-center gap-2.5 transition-opacity hover:opacity-80"
    >
      <img src={logo} alt="GeoTrainr" class="size-8" />
      <span
        class="font-display hidden text-base font-bold tracking-tight sm:block"
        >GeoTrainr</span
      >
    </a>

    <nav class="flex items-center gap-6">
      {#each links as link (link.href)}
        <a
          href={link.href}
          class="relative py-1 text-sm font-medium tracking-wide transition-colors
						{page.url.pathname === link.href
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'}"
        >
          {$i18n.t(link.key)}
          {#if page.url.pathname === link.href}
            <span
              class="bg-primary absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full"
            ></span>
          {/if}
        </a>
      {/each}
    </nav>
  </div>
</header>
