<script lang="ts">
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  let isLogin = false

  if(window.location.pathname === "/login"){
    isLogin = true;
  }

</script>

{#if !isLogin}
<Header />
{/if}
<main class="flex-1 content-center" >
  <slot />
</main>
<Footer />
