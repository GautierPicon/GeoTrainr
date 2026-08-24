<script>
  import { cn } from '$lib/utils.js';
  let {
    ref = $bindable(null),
    class: className,
    children,
    size = 'default',
    ...restProps
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="card"
  data-size={size}
  class={cn(
    'bg-card text-card-foreground group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-lg border py-(--card-spacing) text-sm [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
