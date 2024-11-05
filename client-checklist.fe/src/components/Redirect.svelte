<script lang="ts">
  import { navigate, useLocation } from "svelte-routing";

  const location = useLocation();

  export let to = "";

  $: if (to) {
    navigate(to, { state: { from: location }, replace: true });
  }
</script>
