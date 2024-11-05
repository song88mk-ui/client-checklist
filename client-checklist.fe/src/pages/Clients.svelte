<script lang="ts">
  import Layout from "../components/Layout.svelte";
  import { auth, removeAuth } from "../stores/auth";
  let handleLogout = () => {
    removeAuth();
  };
</script>

<Layout>
  {#if $auth}
    <h3 class="capitalize">Welcome {$auth.fullName}</h3>
  {/if}
  <button
    class="inline-block bg-blue-600 hover:bg-blue-800 text-sm text-white font-semibold py-2 px-3 rounded items-center justify-center disabled:bg-blue-400"
    on:click={handleLogout}>Logout</button
  >
</Layout>
