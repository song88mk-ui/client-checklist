<script lang="ts">
  import Footer from "./Footer.svelte";
  let isLogin = false

  if(window.location.pathname === "/login"){
    isLogin = true;
  }

</script>

<main class="flex-1 content-center" >
  <slot />
</main>
<Footer />
