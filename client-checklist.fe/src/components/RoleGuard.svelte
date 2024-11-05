<script lang="ts">
  import { navigate, useLocation } from "svelte-routing";
  import { auth } from "../stores/auth";
  import type Role from "../types/role";

  const location = useLocation();
  export let allowedRoles: Role[] = [];
  let hasAccess = false;

  $: if (!$auth) {
    navigate("/not-authorized", {
      state: { from: location },
      replace: true,
    });
  } else {
    hasAccess = allowedRoles.includes($auth.role);

    if (!hasAccess) {
      navigate("/not-authorized", {
        state: { from: location },
        replace: true,
      });
    }
  }
</script>

{#if hasAccess}
  <slot />
{/if}
