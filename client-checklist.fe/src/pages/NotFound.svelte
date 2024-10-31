<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Link } from "svelte-routing";
</script>

<div class="px-3 flex-1 flex flex-col items-center justify-center">
  <div class="text-center max-w-lg">
    <h1 class="text-3xl font-bold mb-3">Page Not Found</h1>
    <div class="mb-7">
      Sorry, we couldn't find the page you're looking for. It might have been
      removed, had its name changed, or is temporarily unavailable.
    </div>
    <div>
      <Link
        to="/"
        class="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded inline-flex items-center justify-center disabled:bg-blue-400"
      >
        <Icon icon="mdi:chevron-left" height={24} /> Back to Home
      </Link>
    </div>
  </div>
</div>
