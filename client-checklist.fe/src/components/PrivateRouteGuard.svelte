<script lang="ts">
  import { navigate, useLocation } from "svelte-routing";
  import { auth } from "../stores/auth";

  const location = useLocation();

  $: if (!$auth) {
    navigate("/login", {
      state: { from: location },
      replace: true,
    });
  }
</script>

{#if $auth}
  <slot />
{/if}
