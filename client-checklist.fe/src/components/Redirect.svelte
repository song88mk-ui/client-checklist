<script lang="ts">
  import { tick } from "svelte";
  import { navigate } from "svelte-routing";

  export let to = "";

  $: if (to) {
    tick().then(() => navigate(to, { replace: true }));
  }
</script>
