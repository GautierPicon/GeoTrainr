<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  {#if import.meta.env.PROD}
    {@html '<script defer src="/_vercel/insights/script.js"></' + 'script>'}
  {/if}
</svelte:head>

<div class="flex min-h-screen flex-col">
  <Navbar />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
