<script lang="ts">
  import { tick } from "svelte";
  import { navigate } from "svelte-routing";
  import { auth } from "../stores/auth";

  $: if (!$auth) {
    tick().then(() => navigate("/login", { replace: true }));
  }
</script>

{#if $auth}
  <slot />
{/if}
