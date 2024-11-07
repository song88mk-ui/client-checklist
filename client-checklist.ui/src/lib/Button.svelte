<script lang="ts">
    let { type, classNames, ariaLabel, disabled, click, children } = $props<{
        type: 'button' | 'submit',
        classNames?: string,
        ariaLabel?: string,
        disabled?: boolean,
        click?: () => void
        children: any
    }>();
</script>

<button
    type={type}
    class={classNames}
    aria-label={ariaLabel}
    disabled={disabled}
    onclick={click}
>
{@render children()}
<!-- <Icon icon="mdi:close" height={22} class="fill-current text-red-500" /> -->
</button>