<script>
  let { code } = $props();

  let previousHref;

  $effect(() => {
    if (typeof document === 'undefined') return;
    const link = document.querySelector("link[rel='icon']");
    if (!link) return;
    if (!previousHref) previousHref = link.getAttribute('href');
    link.href = `https://flagcdn.com/${code}.png`;
    return () => {
      link.href = previousHref;
    };
  });
</script>
