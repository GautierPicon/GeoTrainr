<script>
  import { cn } from '$lib/utils.js';

  let {
    checked = $bindable(false),
    disabled = false,
    id = undefined,
    class: className = '',
  } = $props();
</script>

<button
  {id}
  type="button"
  role="switch"
  aria-checked={checked}
  {disabled}
  onclick={() => !disabled && (checked = !checked)}
  class={cn(
    'focus-visible:ring-ring/50 relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50',
    checked ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700',
    className
  )}
>
  <span
    class="pointer-events-none block size-[18px] rounded-full bg-white shadow-md transition-transform duration-200
			{checked ? 'translate-x-[23px]' : 'translate-x-[3px]'}"
  ></span>
</button>
